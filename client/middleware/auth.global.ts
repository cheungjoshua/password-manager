export default defineNuxtRouteMiddleware(async (to, from) => {
  const apiUrl = useRuntimeConfig().public.api_url;

  const { data, error } = await useFetch(`${apiUrl}/`);
  if (data.value) {
    console.log("data", data.value);
    navigateTo(to.fullPath);
  }
  if (error.value) {
    navigateTo("/signIn");
    console.log("error", error.value.statusCode);
  }
});
