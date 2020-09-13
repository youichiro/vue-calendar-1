<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>$close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CalendarFormDialig',
  methods: {
    ...mapActions('calendars', ['resetCalendar']),
    close() {
      this.resetCalendar();
    }
  }
};
</script>
