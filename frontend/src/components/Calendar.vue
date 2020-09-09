<template>
  <div>
    <v-sheet tile height="6vh" color="grey lighten-3" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">今日</v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="94vh" class="d-flex">
      <v-sheet width="200px">
        <CalendarList />
      </v-sheet>
      <v-sheet class="flex">
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
          @click:day="initEvent"
          @click:more="showMoreEvents"
        ></v-calendar>
      </v-sheet>
    </v-sheet>
    <v-overlay :value="event !== null">
      <DetailDialog v-if="!isEditMode" />
      <FormDialog v-if="isEditMode" />
    </v-overlay>
    <v-overlay :value="clickedDate !== null">
      <MoreEvents />
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import DetailDialog from './DetailDialog';
import FormDialog from './FormDialog';
import MoreEvents from './MoreEvents';
import CalendarList from './CalendarList';

export default {
  name: 'Calendar',
  components: { DetailDialog, FormDialog, MoreEvents, CalendarList },
  data: () => ({
    value: moment().format('YYYY-MM-DD')
  }),
  computed: {
    ...mapGetters('events', ['events', 'event', 'isEditMode', 'clickedDate']),
    title() {
      return moment(this.value).format('YYYY年 M月');
    }
  },
  methods: {
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode', 'setClickedDate']),
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.value = moment().format('YYYY-MM-DD');
    },
    showEvent({ nativeEvent, event }) {
      this.setEvent(event);
      nativeEvent.stopPropagation();
    },
    initEvent({ date }) {
      if (this.clickedDate !== null) {
        return;
      }
      const currentTime = moment().format('HH:mm:ss');
      let datetime = moment(`${date} ${currentTime}`);
      this.setEvent({
        name: '',
        start: `${datetime.add(1, 'h').format('YYYY-MM-DD HH')}:00:00`,
        end: `${datetime.add(1, 'h').format('YYYY-MM-DD HH')}:00:00`,
        timed: true
      });
      this.setEditMode(true);
    },
    showMoreEvents({ date }) {
      this.setClickedDate(date);
    }
  }
};
</script>
