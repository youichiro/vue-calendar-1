<template>
  <div>
    <v-sheet tile height="6vh" color="grey lighten-3" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">今日</v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>$arrowLeft</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>$arrowRight</v-icon>
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
      <EventDetailDialog v-if="!isEditMode" />
      <EventFormDialog v-if="isEditMode" />
    </v-overlay>
    <v-overlay :value="clickedDate !== null">
      <MoreEvents />
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EventDetailDialog from '../events/EventDetailDialog';
import EventFormDialog from '../events/EventFormDialog';
import MoreEvents from '../events/MoreEvents';
import CalendarList from '../calendars/CalendarList';
import { getCurrectDateStr, formatDateToMonthlyStr, getDefaultStartAndEnd } from '../../functions/datetime';

export default {
  name: 'Calendar',
  components: { EventDetailDialog, EventFormDialog, MoreEvents, CalendarList },
  data: () => ({
    value: getCurrectDateStr()
  }),
  computed: {
    ...mapGetters('events', ['events', 'event', 'isEditMode', 'clickedDate']),
    title() {
      return formatDateToMonthlyStr(this.value);
    }
  },
  methods: {
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode', 'setClickedDate']),
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.value = getCurrectDateStr();
    },
    showEvent({ nativeEvent, event }) {
      this.setEvent(event);
      nativeEvent.stopPropagation();
    },
    initEvent({ date }) {
      if (this.clickedDate !== null) {
        return;
      }
      const [start, end] = getDefaultStartAndEnd(date);
      this.setEvent({ name: '', start, end, timed: true });
      this.setEditMode(true);
    },
    showMoreEvents({ date }) {
      this.setClickedDate(date);
    }
  }
};
</script>
