<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>$close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <DialogSection icon="squareSolid" :color="color">
        <v-text-field autofocus v-model="name" label="カレンダー名" required></v-text-field>
      </DialogSection>
      <DialogSection icon="palette">
        <ColorForm v-model="color" />
      </DialogSection>
    </v-card-text>
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
    ...mapActions('calendars', ['resetCalendar']),
    close() {
      this.resetCalendar();
    }
  }
};
</script>
