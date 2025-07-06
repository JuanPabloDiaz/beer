// Font loader plugin to optimize font loading and eliminate render blocking
export default defineNuxtPlugin(() => {
  // Only run in client-side
  if (process.client) {
    // Create a link preload element for the Inter font
    const fontPreload = document.createElement("link");
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.type = 'font/ttf';
    fontPreload.crossOrigin = 'anonymous';
    fontPreload.href = 'https://fonts.gstatic.com/s/inter/v19/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf';
    document.head.appendChild(fontPreload);

    // Add font-display: swap to any Google Fonts stylesheet
    const fontLinks = document.querySelectorAll(
      'link[href*="fonts.googleapis.com"]',
    );
    fontLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && !href.includes("&display=swap")) {
        link.setAttribute("href", `${href}&display=swap`);
      }
    });
  }
});
