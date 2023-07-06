import {
  ValidationObserver,
  ValidationProvider,
  localize,
  extend
} from "vee-validate";
import pt_BR from "vee-validate/dist/locale/pt_BR";
import {
  required,
  max,
  numeric,
  image,
  email,
  min
} from "vee-validate/dist/rules";
import Vue from "vue";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

localize("pt_BR", pt_BR);

extend("required", required);
extend("numeric", numeric);
extend("max", max);
extend("min", min);
extend("image", image);
extend("email", email);
