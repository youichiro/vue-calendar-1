<template>
  <v-list dense>
    <v-list-item v-for="(calendar, i) in calendars" :key="i">
      <v-list-item-icon>
        <font-awesome-icon icon="square" :color="calendar.color" style="font-size: 20px" />
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
