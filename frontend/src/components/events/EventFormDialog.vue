<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>$close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <DialogSection icon="squareSolid" :color="color">
        <v-text-field autofocus v-model="name" label="タイトル" required></v-text-field>
      </DialogSection>
      <DialogSection icon="clock">
        <div><DateForm v-model="startDate" /></div>
        <template v-if="!allDay">
          <div><TimeForm v-model="startTime" /></div>
          <div>~</div>
          <div v-bind:class="{ 'red lighten-4 rounded': !isGreaterEnd }"><TimeForm v-model="endTime" /></div>
        </template>
        <template v-else>
          <div class="px-4">~</div>
        </template>
        <div :class="{ 'red lighten-4 rounded': !isGreaterEnd }"><DateForm v-model="endDate" /></div>
        <div><v-checkbox v-model="allDay" label="終日" class="ml-4"></v-checkbox></div>
      </DialogSection>
      <DialogSection icon="textarea">
        <v-textarea filled rounded auto-grow v-model="description" placeholder="詳細" rows="4"></v-textarea>
      </DialogSection>
      <DialogSection icon="calendar">
        <CalendarSelectForm :value="calendar" @input="changeCalendar($event)" />
      </DialogSection>
      <DialogSection icon="palette">
        <ColorForm v-model="color" />
      </DialogSection>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="cancel">キャンセル</v-btn>
      <v-btn :disabled="$v.$invalid || !isGreaterEnd" @click="submit">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import DateForm from '../forms/DateForm';
import TimeForm from '../forms/TimeForm';
import ColorForm from '../forms/ColorForm';
import DialogSection from '../commons/DialogSection';
import CalendarSelectForm from '../forms/CalendarSelectForm';
import { isGreaterEndThanStart } from '../../functions/datetime';

export default {
  name: 'FormDialog',
  mixins: [validationMixin],
  components: { DateForm, TimeForm, ColorForm, DialogSection, CalendarSelectForm },
  validations: {
    name: { required },
    startDate: { required },
    endDate: { required },
    calendar: { required }
  },
  data: () => ({
    name: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    description: '',
    color: null,
    allDay: false,
    calendar: null
  }),
  computed: {
    ...mapGetters('events', ['event']),
    isGreaterEnd() {
      return isGreaterEndThanStart(this.startDate, this.startTime, this.endDate, this.endTime, this.allDay);
    }
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
    this.calendar = this.event.calendar;
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
    changeCalendar(calendar) {
      this.color = calendar.color;
      this.calendar = calendar;
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
        color: this.color,
        calendar_id: this.calendar.id
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
