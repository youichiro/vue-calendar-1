<template>
  <div>
    <div class="d-flex mx-6 mt-6 justify-space-between align-center">
      <div class="caption">マイカレンダー</div>
      <v-icon size="14px">$plus</v-icon>
    </div>
    <v-list dense>
      <v-list-item v-for="(calendar, i) in calendars" :key="i">
        <v-list-item-content class="pa-0 ma-0">
          <v-checkbox
            dense
            v-model="calendar.visibility"
            :color="calendar.color"
            :label="calendar.name"
            @click="toggleVisibility(calendar)"
          ></v-checkbox>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
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
      this.updateCalendar(calendar);
    }
  }
};
</script>
