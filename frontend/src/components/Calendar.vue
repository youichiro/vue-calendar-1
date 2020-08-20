<template>
  <div>
    <v-sheet tile height="6vh" color="grey lighten-3" class="d-flex align-center">
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="94vh">
      <v-calendar
        ref="calendar"
        :events="events"
        :event-color="getEventColor"
        @change="fetchEvents"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Calendar',
  computed: {
    ...mapGetters('events', ['events'])
  },
  methods: {
    ...mapActions('events', ['fetchEvents']),
    getEventColor(event) {
      return event.color;
    }
  }
};
</script>
