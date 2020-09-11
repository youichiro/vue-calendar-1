<template>
  <v-list dense>
    <v-list-item v-for="(calendar, i) in calendars" :key="i">
      <v-list-item-icon>
        <v-icon :color="calendar.color" size="20px">$squareSolid</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        {{ calendar.name }}
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
