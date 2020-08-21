<template>
  <v-menu transition="scale-transition" offset-y min-width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :label="value.label"
        :value="date"
        @input="data = $event.target.value"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DateForm',
  props: ['value'],
  computed: {
    date: {
      get() {
        return this.value.value;
      },
      set(value) {
        this.$emit('input', { ...this.value, value });
      }
    }
  }
};
</script>
