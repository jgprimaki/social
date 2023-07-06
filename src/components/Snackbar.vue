<template>
  <v-snackbar v-model="show" :color="color" :timeout="timeout" multi-line>
    <div class="mr-4">
      <v-icon v-if="color === 'success'" large dark>mdi-cloud-check</v-icon>
      <v-icon v-else-if="color === 'error'" large dark
        >mdi-cloud-off-outline</v-icon
      >
      <v-icon v-else-if="color === 'info'" large dark
        >mdi-information-outline</v-icon
      >
      <v-icon v-else large dark>{{ icon }}</v-icon>
    </div>
    <span>{{ $t(message, args) }}</span>
    <v-btn @click="show = !show" dark text>
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    icon: String,
    args: Array,
    show: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    },
    timeOut: {
      type: Number,
      default: 6000
    },
    message: {
      type: String,
      required: true
    }
  },
  created() {
    setTimeout(
      () => this.$store.dispatch("showSnackbar", false),
      this.timeOut - 100
    );
  }
};
</script>
