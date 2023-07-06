import Dashboard from "../views/Dashboard.vue";

export default [
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/meeting",
    name: "meeting",
    component: () =>
      import(/* webpackChunkName: "meeting" */ "../views/Meeting.vue")
  },
  {
    path: "/report",
    name: "report",
    component: () =>
      import(/* webpackChunkName: "report" */ "../views/Report.vue")
  },
  {
    path: "/phone",
    name: "phone",
    component: () =>
      import(/* webpackChunkName: "phone" */ "../views/Phone.vue")
  },
  {
    path: "/readme",
    name: "readme",
    component: () =>
      import(/* webpackChunkName: "readme" */ "../views/Readme.vue")
  },
  {
    path: "/birthday",
    name: "birthday",
    component: () =>
      import(/* webpackChunkName: "birthday" */ "../views/Birthday.vue")
  },
  {
    path: "/social",
    name: "social",
    component: () =>
      import(/* webpackChunkName: "social" */ "../views/Social.vue")
  },
  {
    path: "/party",
    name: "party",
    component: () =>
      import(/* webpackChunkName: "party" */ "../views/Party.vue")
  }
];
