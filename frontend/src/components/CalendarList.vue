<template>
  <v-list dense>
    <v-list-item v-for="(calendar, i) in calendars" :key="i">
      <v-list-item-content>
        <v-checkbox v-model="calendar.visibility" :color="calendar.color" :label="calendar.name"></v-checkbox>
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
    ...mapActions('calendars', ['fetchCalendars'])
  }
};
</script>
