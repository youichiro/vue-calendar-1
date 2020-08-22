<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-text-field v-model="name" label="タイトル" required></v-text-field>
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
      <v-btn :disabled="$v.$invalid" @click="submit">保存</v-btn>
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
    name: { required },
    startDate: { required },
    endDate: { required }
  },
  data: () => ({
    name: '',
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
    this.name = this.event.name;
    this.startDate = this.event.start.getFullYear() + moment(this.event.start).format('-MM-DD');
    this.startTime = this.event.timed ? moment(this.event.start).format('HH:mm:ss') : null;
    this.endDate = this.event.start.getFullYear() + moment(this.event.end).format('-MM-DD');
    this.endTime = this.event.timed ? moment(this.event.end).format('HH:mm:ss') : null;
    this.description = this.event.description;
  },
  methods: {
    ...mapActions('events', ['updateEvent', 'resetEvent', 'setEditMode']),
    close() {
      this.resetEvent();
      this.setEditMode(false);
    },
    cancel() {
      this.setEditMode(false);
    },
    submit() {
      if (this.$v.$invalid) {
        return;
      }
      const params = {
        ...this.event,
        name: this.name,
        start: `${this.startDate} ${this.startTime}`,
        end: `${this.endDate} ${this.endTime}`,
        description: this.description
      };
      this.updateEvent(params);
      this.close();
    }
  }
};
</script>
