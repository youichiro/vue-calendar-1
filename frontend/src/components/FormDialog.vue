<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-row>
        <v-col cols="2" align-self="center" class="d-flex justify-center">
          title
        </v-col>
        <v-col>
          <v-text-field autofocus v-model="name" placeholder="タイトル" required></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="2" align-self="center" class="d-flex justify-center">
          datetime
        </v-col>
        <v-col class="d-flex align-center">
          <div><DateForm v-model="startDate" /></div>
          <template v-if="!allDay">
            <div><TimeForm v-model="startTime" /></div>
            <div>~</div>
            <div><TimeForm v-model="endTime" /></div>
          </template>
          <div><DateForm v-model="endDate" /></div>
          <div><v-checkbox v-model="allDay" label="終日" class="ml-4"></v-checkbox></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" align-self="center" class="d-flex justify-center">
          description
        </v-col>
        <v-col>
          <v-textarea
            filled
            rounded
            auto-grow
            v-model="description"
            placeholder="詳細"
            rows="4"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" align-self="center" class="d-flex justify-center">
          color
        </v-col>
        <v-col>
          <ColorForm v-model="color" />
        </v-col>
      </v-row>
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
