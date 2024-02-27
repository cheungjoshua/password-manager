// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/main.scss"],
  modules: ["nuxt-icons"],

  runtimeConfig: {
    public: {
      api_url: process.env.API_URL,
    },
  },
});
