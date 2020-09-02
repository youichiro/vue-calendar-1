<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <DialogSection icon="square" :color="color">
        <v-text-field autofocus v-model="name" label="タイトル" required></v-text-field>
      </DialogSection>
      <DialogSection icon="calendar-day">
        <div><DateForm v-model="startDate" /></div>
        <template v-if="!allDay">
          <div><TimeForm v-model="startTime" /></div>
          <div>~</div>
          <div><TimeForm v-model="endTime" /></div>
        </template>
        <template v-else>
          <div class="px-4">~</div>
        </template>
        <div><DateForm v-model="endDate" /></div>
        <div><v-checkbox v-model="allDay" label="終日" class="ml-4"></v-checkbox></div>
      </DialogSection>
      <DialogSection icon="align-left">
        <v-textarea filled rounded auto-grow v-model="description" placeholder="詳細" rows="4"></v-textarea>
      </DialogSection>
      <DialogSection icon="palette">
        <ColorForm v-model="color" />
      </DialogSection>
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
import DialogSection from './DialogSection';

export default {
  name: 'FormDialog',
  mixins: [validationMixin],
  components: { DateForm, TimeForm, ColorForm, DialogSection },
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
