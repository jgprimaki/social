import Vue from "vue";
import VueI18n from "vue-i18n";

import ptBR from "../i18n/pt-BR.js";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "pt",
  messages: {
    pt: ptBR
  }
});
