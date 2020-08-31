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
        <v-col><DateForm v-model="startDate"/></v-col>
        <template v-if="!allDay">
          <v-col><TimeForm v-model="startTime"/></v-col>
          <v-col cols="1" class="overline text-center">〜</v-col>
          <v-col><TimeForm v-model="endTime"/></v-col>
        </template>
        <v-col><DateForm v-model="endDate"/></v-col>
        <v-col><v-checkbox v-model="allDay" label="終日"></v-checkbox></v-col>
      </v-row>
      <v-textarea v-model="description" label="詳細"></v-textarea>
      <ColorForm v-model="color" />
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
import DateForm from './DateForm';
import TimeForm from './TimeForm';
import ColorForm from './ColorForm';

export default {
  name: 'FormDialog',
  mixins: [validationMixin],
  components: { DateForm, TimeForm, ColorForm },
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
    description: '',
    color: null,
    allDay: false
  }),
  computed: {
    ...mapGetters('events', ['event'])
  },
  created() {
    this.name = this.event.name;
    this.startDate = this.event.startDate;
    this.startTime = this.event.startTime;
    this.endDate = this.event.endDate;
    this.endTime = this.event.endTime;
    this.description = this.event.description;
    this.color = this.event.color;
    this.allDay = !this.event.timed;
  },
  methods: {
    ...mapActions('events', ['updateEvent', 'createEvent', 'resetEvent', 'setEditMode']),
    close() {
      this.resetEvent();
      this.setEditMode(false);
    },
    cancel() {
      this.setEditMode(false);
      if (!this.event.id) {
        this.resetEvent();
      }
    },
    submit() {
      if (this.$v.$invalid) {
        return;
      }
      const params = {
        ...this.event,
        name: this.name,
        start: `${this.startDate} ${this.startTime || ''}`,
        end: `${this.endDate} ${this.endTime | ''}`,
        timed: !this.allDay,
        description: this.description,
        color: this.color
      };
      if (params.id) {
        this.updateEvent(params);
      } else {
        this.createEvent(params);
      }
      this.close();
    }
  }
};
</script>
