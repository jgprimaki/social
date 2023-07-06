<template>
  <v-toolbar flat>
    <v-row align="center">
      <v-col class="d-flex align-center " lg="3">
        <v-btn :disabled="!showPrev" @click="prev" class="mr-1" fab text small>
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title | capitalize }}</v-toolbar-title>
        <v-btn :disabled="!showNext" @click="next" class="ml-1" fab text small>
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex mt-3" lg="2">
        <v-select v-model="type" :items="typeToLabel"></v-select>
      </v-col>
      <!-- Extra -->
      <slot name="extraElement"></slot>
    </v-row>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      typeToLabel: [
        { text: "Mês", value: "month" },
        { text: "Semana", value: "week" },
        { text: "Dia", value: "day" }
      ]
    };
  },
  props: {
    title: {
      type: String,
      required: true
    },
    showPrev: {
      type: Boolean,
      required: true,
      default: true
    },
    showNext: {
      type: Boolean,
      required: true,
      default: true
    },
    type: {
      type: String,
      default: "month",
      required: true
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  watch: {
    type(val) {
      this.$emit("update:type", val);
    }
  },
  methods: {
    setToday() {
      this.$emit("setToday");
    },
    prev() {
      this.$emit("prev");
    },
    next() {
      this.$emit("next");
    }
  }
};
</script>
