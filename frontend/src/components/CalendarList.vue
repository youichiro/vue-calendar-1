<template>
  <v-list dense>
    <v-list-item class="pr-0">
      <v-list-item-content class="caption">マイカレンダー</v-list-item-content>
      <v-list-item-action>
        <v-icon size="12px" @click="initCalendar()">$plus</v-icon>
      </v-list-item-action>
    </v-list-item>
    <v-list-item v-for="(calendar, i) in calendars" :key="i" class="pr-0">
      <v-list-item-content class="pa-0 ma-0">
        <v-checkbox
          dense
          v-model="calendar.visibility"
          :color="calendar.color"
          :label="calendar.name"
          @click="toggleVisibility(calendar)"
        ></v-checkbox>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon size="12px">$configMenu</v-icon>
      </v-list-item-action>
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
      this.updateCalendar(calendar);
    }
  }
};
</script>
