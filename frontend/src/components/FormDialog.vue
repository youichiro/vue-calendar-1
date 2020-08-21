<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-text-field v-model="title" label="タイトル" required></v-text-field>
      <DateForm v-model="startDate" label="start date" />
      <TimeForm v-model="startTime" label="start time" />
      <DateForm v-model="endDate" label="end date" />
      <TimeForm v-model="endTime" label="end time" />
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="cancel">キャンセル</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import DateForm from './DateForm';
import TimeForm from './TimeForm';

export default {
  name: 'FormDialog',
  mixins: [validationMixin],
  components: { DateForm, TimeForm },
  validations: {
    title: { required },
    startDate: { required },
    endDate: { required }
  },
  data: () => ({
    title: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null
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
