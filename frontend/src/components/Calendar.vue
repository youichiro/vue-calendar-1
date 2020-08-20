<template>
  <div>
    <v-sheet tile height="6vh" color="grey lighten-3" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">
        今日
      </v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="94vh">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        :event-color="getEventColor"
        locale="ja-jp"
        :day-format="timestamp => new Date(timestamp.date).getDate()"
        :month-format="timestamp => new Date(timestamp.date).getMonth() + 1 + ' /'"
        @change="fetchEvents"
        @click:event="showEvent"
      ></v-calendar>
    </v-sheet>
    <v-overlay :value="event !== null">
      <DetailDialog />
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import DetailDialog from './DetailDialog';

export default {
  name: 'Calendar',
  components: {
    DetailDialog
  },
  data: () => ({
    value: moment().format('yyyy-MM-DD')
  }),
  computed: {
    ...mapGetters('events', ['events', 'event']),
    title() {
      return moment(this.value).format('yyyy年 M月');
    }
  },
  methods: {
    ...mapActions('events', ['fetchEvents', 'setEvent']),
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.value = moment().format('yyyy-MM-DD');
    },
    showEvent({ event }) {
      this.setEvent(event);
    }
  }
};
</script>
