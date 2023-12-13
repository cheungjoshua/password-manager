import axios from "axios";

export default defineNuxtRouteMiddleware((to, from) => {
  const authCookie = document.cookie;

  if (!authCookie) {
    return navigateTo("/login");
  }
});
