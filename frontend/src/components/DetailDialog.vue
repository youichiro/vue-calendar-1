<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="edit">
        <font-awesome-icon icon="edit" />
      </v-btn>
      <v-btn icon @click="del">
        <font-awesome-icon icon="trash" />
      </v-btn>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-title>
      <v-row>
        <v-col cols="2" align-self="center" class="d-flex justify-center">
          <font-awesome-icon icon="square" :color="event.color" style="font-size: 20px;" />
        </v-col>
        <v-col>
          {{ event.name }}
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="2" align-self="center" class="d-flex justify-center">
          <font-awesome-icon icon="calendar-day" style="font-size: 20px;" />
        </v-col>
        <v-col>
          {{ dateText }}
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="2" align-self="center" class="d-flex justify-center">
          <font-awesome-icon icon="align-left" style="font-size: 20px;" />
        </v-col>
        <v-col>
          {{ event.description || 'no description' }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { eventDateFormatter } from '../functions/formatters';

export default {
  name: 'Detail',
  computed: {
    ...mapGetters('events', ['event']),
    dateText() {
      return eventDateFormatter(this.event);
    }
  },
  methods: {
    ...mapActions('events', ['resetEvent', 'deleteEvent', 'setEditMode']),
    close() {
      this.resetEvent();
    },
    del() {
      this.deleteEvent(this.event.id);
    },
    edit() {
      this.setEditMode(true);
    }
  }
};
</script>
