import { createRouter, createWebHistory } from "vue-router";

import axios from "axios";

import DashboardView from "@/views/DashboardView.vue";
import SignInView from "@/views/SignInView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      alias: "/dashboard",
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignInView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  try {
    if (to.name !== "sign-in") {
      await axios.get("/auth/", { withCredentials: true });
    }
  } catch (error) {
    if (to.name !== "sign-in") {
      return { name: "sign-in" };
    }
  }
});

export default router;
