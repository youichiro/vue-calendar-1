<template>
  <v-list dense>
    <v-list-item v-for="(calendar, i) in calendars" :key="i" @click="toggleVisibility(calendar)">
      <v-list-item-content class="pa-0 ma-0">
        <v-checkbox dense v-model="calendar.visibility" :color="calendar.color" :label="calendar.name"></v-checkbox>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CalendarList',
  computed: {
    ...mapGetters('calendars', ['calendars'])
  },
  created() {
    this.fetchCalendars();
  },
  methods: {
    ...mapActions('calendars', ['fetchCalendars', 'updateCalendar']),
    toggleVisibility(calendar) {
      const params = {
        ...calendar,
        visibility: !calendar.visibility
      };
      this.updateCalendar(params);
    }
  }
};
</script>
