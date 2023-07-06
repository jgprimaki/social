import Vue from "vue";
import VueLogger from "vuejs-logger";

Vue.use(VueLogger, {
  isEnabled: true,
  logLevel: process.env.NODE_ENV === "production" ? "error" : "debug",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true
});

export default VueLogger;
