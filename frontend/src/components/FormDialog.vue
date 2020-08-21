<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-text-field v-model="title" label="タイトル" required></v-text-field>
      <DateForm v-model="startDate" />
      <TimeForm v-model="startTime" />
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="cancel">キャンセル</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import DateForm from './DateForm';
import TimeForm from './TimeForm';

import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'FormDialog',
  mixins: [validationMixin],
  components: {
    DateForm,
    TimeForm
  },
  validations: {
    title: { required },
    startDate: { required }
  },
  data: () => ({
    title: '',
    startDate: {
      value: null,
      label: 'start date'
    },
    startTime: {
      value: null,
      label: 'start time'
    }
  }),
  computed: {
    ...mapGetters('events', ['event'])
  },
  created() {
    this.title = this.event.title;
  },
  methods: {
    ...mapActions('events', ['resetEvent', 'setEditMode']),
    close() {
      this.resetEvent();
      this.setEditMode(false);
    },
    cancel() {
      this.setEditMode(false);
    }
  }
};
</script>
