import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  experimental: {
    viewTransition: true,
  },
  modules: ['@nuxt/eslint', '@nuxt/image', '@pinia/nuxt'],
  components: [{
    path: '~/components',
    pathPrefix: false,
  }],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
})