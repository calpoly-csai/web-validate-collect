import Vue from "vue";
import Router from "vue-router";
import Auth from "./views/Auth.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Auth",
      component: Auth
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./views/Dashboard.vue")
    },
    {
      path: "/uploads",
      name: "Uploads",
      component: () => import("./views/Uploads.vue")
    },
    {
      path: "/validate",
      name: "Validate",
      component: () => import("./views/Validate.vue")
    },
    {
      path: "/phrases",
      name: "Phrases",
      component: () => import("./views/Phrases.vue")
    }
  ]
});
