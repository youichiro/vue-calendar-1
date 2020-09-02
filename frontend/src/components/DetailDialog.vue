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
      <DialogSection icon="square" :color="event.color">{{ event.name }}</DialogSection>
    </v-card-title>
    <v-card-text>
      <DialogSection icon="calendar-day">{{ dateText }}</DialogSection>
    </v-card-text>
    <v-card-text>
      <DialogSection icon="align-left">{{ event.description || 'no description' }}</DialogSection>
    </v-card-text>
    <div style="height: 52px"></div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { eventDateFormatter } from '../functions/formatters';
import DialogSection from './DialogSection';

export default {
  name: 'Detail',
  components: { DialogSection },
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
