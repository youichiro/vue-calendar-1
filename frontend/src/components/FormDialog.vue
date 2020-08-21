<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-text-field v-model="title" label="タイトル" required></v-text-field>
      <v-row no-gutters>
        <v-col><DateForm v-model="startDate" label="start date"/></v-col>
        <v-col><TimeForm v-model="startTime" label="start time"/></v-col>
        <v-col><TimeForm v-model="endTime" label="end time"/></v-col>
        <v-col><DateForm v-model="endDate" label="end date"/></v-col>
      </v-row>
      <v-textarea v-model="description" label="詳細"></v-textarea>
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
import moment from 'moment';
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
    endTime: null,
    description: ''
  }),
  computed: {
    ...mapGetters('events', ['event'])
  },
  created() {
    this.title = this.event.title;
    this.startDate = moment(this.event.start).format('yyyy-MM-DD');
    this.startTime = this.event.timed ? moment(this.event.start).format('HH:mm:ss') : null;
    this.endDate = moment(this.event.end).format('yyyy-MM-DD');
    this.endTime = this.event.timed ? moment(this.event.end).format('HH:mm:ss') : null;
    this.description = this.event.description;
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
