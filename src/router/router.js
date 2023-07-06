import Vue from "vue";
import VueRouter from "vue-router";

import AppRoutes from "./app.routes";

Vue.use(VueRouter);

const routes = AppRoutes;

const router = new VueRouter({
  mode: process.env.VUE_APP_MODE_HISTORY,
  base: `/${process.env.VUE_APP_NAME}`,
  routes
});

export default router;
