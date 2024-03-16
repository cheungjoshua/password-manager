import axios from "axios";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const apiUrl = useRuntimeConfig().public.api_url;

  const { data, error } = await useFetch(`${apiUrl}`, {
    credentials: "include",
  });

  console.log("data", data, "error", error);

  if (to.path !== "/sign-in") {
    if (error.value) {
      return navigateTo({ path: "/sign-in" });
    }
  }

  // if (error.value) {
  //   console.log("auth error: status code ", error.value.statusCode);
  //   return navigateTo({ path: "/sign-in" });
  // }

  // return;

  // if (data.value) {
  //   console.log("data", data.value);
  //   navigateTo(to.fullPath);
  // }
  // if (error.value) {
  //   console.log("error", error.value.statusCode);
  //   return navigateTo({ path: "/sign-in" });
  // }
});
