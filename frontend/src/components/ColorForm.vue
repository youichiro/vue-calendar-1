<template>
  <div class="d-flex align-center">
    <v-menu transition="scale-transition" offset-y min-width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <font-awesome-icon icon="circle" :color="color" class="mr-2" style="font-size: 20px;" />
          <font-awesome-icon
            icon="caret-down"
            color="rgba(0, 0, 0, 0.6)"
            style="font-size: 16px;"
          />
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
