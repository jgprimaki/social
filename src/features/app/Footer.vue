<template>
  <v-footer>
    <span class="mr-1"> Copyright © {{ year }} All rights reserved </span>
    <a class="text-decoration-none" href="http://www.dynamix.com.br"
      >Dynamix Software</a
    >
    <v-col class="d-flex justify-end pb-1">
      <v-btn
        v-for="(s, i) in social"
        :color="s.color"
        :href="s.link"
        :key="i"
        target="blank"
        link
        icon
      >
        <v-icon size="20">{{ s.icon }}</v-icon>
      </v-btn>
    </v-col>
  </v-footer>
</template>

<script>
import { nowYear } from "../../helpers/dateUtils";

export default {
  data: () => ({
    year: nowYear(),
    social: [
      {
        link: "http://www.dynamix.com.br",
        icon: "mdi-web",
        color: "green"
      },
      {
        link: "home",
        icon: "mdi-facebook-box",
        color: "blue"
      },
      {
        link: "home",
        icon: "mdi-instagram",
        color: "deep-orange"
      },
      {
        link: "home",
        icon: "mdi-youtube",
        color: "red darken-2"
      },
      {
        link: "home",
        icon: "mdi-twitter",
        color: "indigo"
      }
    ]
  })
};
</script>
