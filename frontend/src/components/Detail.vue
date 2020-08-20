<template>
  <v-card light>
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-title>
      {{ event.name }}
    </v-card-title>
    <v-card-text>
      {{ event.start }}
      {{ event.end }}
    </v-card-text>
    <v-card-text>
      {{ event.description }}
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Detail',
  computed: {
    ...mapGetters('events', ['event'])
  },
  methods: {
    ...mapActions('events', ['resetEvent']),
    close() {
      this.resetEvent();
    }
  }
};
</script>
