<template>
  <v-text-field type="time" v-model="time" :label="value.label"></v-text-field>
</template>

<script>
export default {
  name: 'TimeForm',
  props: ['value'],
  computed: {
    time: {
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
