<template>
  <v-card light width="600">
    <v-card-text>
      <DialogSection icon="squareSolid" :color="color">
        <v-text-field autofocus v-model="name" label="カレンダー名" required></v-text-field>
      </DialogSection>
      <DialogSection icon="palette">
        <ColorForm v-model="color" />
      </DialogSection>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="close">キャンセル</v-btn>
      <v-btn :disabled="$v.$invalid" @click="submit">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import DialogSection from './DialogSection';
import ColorForm from './ColorForm';

export default {
  name: 'CalendarFormDialig',
  mixins: [validationMixin],
  components: { DialogSection, ColorForm },
  validations: {
    name: { required }
  },
  data: () => ({
    name: '',
    color: null
  }),
  computed: {
    ...mapGetters('calendars', ['calendar'])
  },
  created() {
    this.name = this.calendar.name;
    this.color = this.calendar.color;
  },
  methods: {
    ...mapActions('calendars', ['createCalendar', 'updateCalendar', 'resetCalendar']),
    close() {
      this.resetCalendar();
    },
    submit() {
      if (this.$v.$invalid) {
        return;
      }
      const params = {
        ...this.calendar,
        name: this.name,
        color: this.color
      };
      if (params.id) {
        this.updateCalendar(params);
      } else {
        this.createCalendar(params);
      }
      this.close();
    }
  }
};
</script>
