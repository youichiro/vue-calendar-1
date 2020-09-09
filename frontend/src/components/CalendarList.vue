<template>
  <div>
    {{ calendars }}
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
    ...mapActions('calendars', ['fetchCalendars'])
  }
};
</script>
