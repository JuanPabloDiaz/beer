// Cloudflare Pages configuration for Nuxt 3
export default {
  async fetch(request, env) {
    try {
      // Serve static assets
      const url = new URL(request.url);
      const path = url.pathname;

      // Handle API requests or serve the SPA for client-side routing
      return env.ASSETS.fetch(request);
    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  },
};
