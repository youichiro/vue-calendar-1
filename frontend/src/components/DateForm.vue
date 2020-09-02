<template>
  <v-menu transition="scale-transition" offset-y min-width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text block v-bind="attrs" v-on="on" class="pa-2">{{ formatDateToJa(date) }}</v-btn>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      locale="ja-ja"
      :day-format="date => new Date(date).getDate()"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { formatDateToJa } from '../functions/formatters';

export default {
  name: 'DateForm',
  props: ['value', 'label'],
  computed: {
    date: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    formatDateToJa
  }
};
</script>
