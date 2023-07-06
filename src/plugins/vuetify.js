import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import pt from "vuetify/lib/locale/pt.js";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#D81B60"
      }
    }
  },
  icons: {
    iconfont: "mdi"
  },
  lang: {
    current: "pt",
    locales: { pt }
  }
});
