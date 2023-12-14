import axios from "axios";

export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(authCookie);
  // if (!authCookie) {
  //   return navigateTo("/login");
  // }

  console.log(to);
  console.log(from);
});
