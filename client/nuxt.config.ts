// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/main.scss"],
  runtimeConfig: {
    public: {
      api_url: process.env.API_URL,
    },
  },
});
