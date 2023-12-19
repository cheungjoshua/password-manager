export default defineNuxtRouteMiddleware(async (to, from) => {
  const apiUrl = useRuntimeConfig().public.api_url;

  const { data, error } = await useFetch(`${apiUrl}/`);
  if (data.value) {
    console.log("data", data.value);
  }
  if (error.value) {
    console.log("error", error.value.statusCode);
  }
});
