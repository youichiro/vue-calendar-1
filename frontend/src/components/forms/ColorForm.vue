<template>
  <div class="d-flex align-center">
    <v-menu transition="scale-transition" offset-y min-width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <v-icon :color="color" size="20px" class="mr-2">$circleSolid</v-icon>
          <v-icon color="rgba(0, 0, 0, 0.6)" size="16px">$arrowDown</v-icon>
        </v-btn>
      </template>
      <v-color-picker v-model="color" hide-canvas hide-inputs show-swatches></v-color-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'ColorForm',
  props: ['value'],
  computed: {
    color: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
};
</script>
