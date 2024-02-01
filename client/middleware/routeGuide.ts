export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path === "/") {
    return navigateTo({ path: "/dashboard" });
  }
});
