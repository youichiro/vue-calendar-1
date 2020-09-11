<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="edit">
        <v-icon size="20px">$edit</v-icon>
      </v-btn>
      <v-btn icon @click="del">
        <v-icon size="20px">$trash</v-icon>
      </v-btn>
      <v-btn icon @click="close">
        <v-icon size="20px">$close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-title>
      <DialogSection icon="squareSolid" :color="event.color">{{ event.name }}</DialogSection>
    </v-card-title>
    <v-card-text>
      <DialogSection icon="calendar">{{ dateText }}</DialogSection>
    </v-card-text>
    <v-card-text>
      <DialogSection icon="textarea">{{ event.description || 'no description' }}</DialogSection>
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
