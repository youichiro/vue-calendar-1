<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-title class="d-flex justify-center">
      {{ formatDateToJa(clickedDate) }}
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(event, i) in eventsFilterByDate" :key="i">
          <v-list-item-content class="pa-0">
            <v-btn depressed :color="event.color" class="white--text justify-start">
              <template v-if="event.timed">
                {{ formatTimeToJa(event.startTime) }}
              </template>
              {{ event.name }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formatDateToJa, formatTimeToJa } from '../functions/formatters';

export default {
  name: 'MoreEvents',
  computed: {
    ...mapGetters('events', ['eventsFilterByDate', 'clickedDate'])
  },
  methods: {
    ...mapActions('events', ['setClickedDate']),
    close() {
      this.setClickedDate(null);
    },
    formatDateToJa,
    formatTimeToJa
  }
};
</script>
