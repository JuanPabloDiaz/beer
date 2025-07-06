import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const gaId = config.public.googleAnalyticsId

  // Only initialize GA if an ID is provided
  if (gaId && typeof window !== 'undefined') {
    // Create script elements
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    
    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `
    
    // Add scripts to document head
    document.head.appendChild(script1)
    document.head.appendChild(script2)
    
    console.log('Google Analytics initialized with ID:', gaId)
  }
})
