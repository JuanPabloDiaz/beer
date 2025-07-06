// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Modules
  modules: ["@nuxtjs/tailwindcss"],

  // CSS
  css: ["~/assets/css/fonts.css"],

  // App configuration
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Craft Beer",
      titleTemplate: "%s | Craft Beer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Explore craft breweries around the world with our modern brewery directory.",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#f59e0b" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
    },
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBase: "https://api.openbrewerydb.org/v1",
      googleAnalyticsId: "", // To be filled by user
    },
  },

  // Build configuration
  build: {
    transpile: [],
  },

  // Nitro configuration for deployment compatibility
  nitro: {
    preset: "node-server",
    // Enable compatibility with various hosting platforms
    prerender: {
      crawlLinks: true,
      routes: ["/", "/breweries", "/documentation", "/metadata"],
    },
  },
});
