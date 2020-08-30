<template>
  <v-menu transition="scale-transition" offset-y min-width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :label="label"
        :value="formatDateToJa(date)"
        @input="data = $event.target.value"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
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
import moment from 'moment';

moment.locale('ja', { weekdays: ['日', '月', '火', '水', '木', '金', '土'] });

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
    formatDateToJa(date) {
      if (date === null) {
        return;
      }
      return moment(date).format('M月D日 (dddd)');
    }
  }
};
</script>
