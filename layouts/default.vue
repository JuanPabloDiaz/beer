<template>
  <div class="min-h-screen flex flex-col bg-amber-50 dark:bg-gray-900 transition-colors duration-200">
    <header class="bg-amber-500 dark:bg-amber-800 text-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="text-2xl font-bold">🍺 Craft Beer</span>
        </NuxtLink>
        
        <!-- Mobile menu button -->
        <button 
          @click="isMenuOpen = !isMenuOpen" 
          class="md:hidden"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMenuOpen ? 'true' : 'false'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/breweries" class="hover:text-amber-200 transition-colors">Breweries</NuxtLink>
          <NuxtLink to="/breweries/random" class="hover:text-amber-200 transition-colors">Random Brewery</NuxtLink>
          <NuxtLink to="/search" class="hover:text-amber-200 transition-colors">Search</NuxtLink>
          <NuxtLink to="/metadata" class="hover:text-amber-200 transition-colors">Metadata</NuxtLink>
          <NuxtLink to="/documentation" class="hover:text-amber-200 transition-colors">Documentation</NuxtLink>
          <button 
            @click="toggleDarkMode" 
            class="p-2 rounded-full hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors"
            :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </nav>
      </div>
      
      <!-- Mobile Navigation -->
      <div v-show="isMenuOpen" class="md:hidden bg-amber-600 dark:bg-amber-900">
        <div class="container mx-auto px-4 py-2 flex flex-col space-y-2">
          <NuxtLink to="/breweries" class="py-2 hover:text-amber-200 transition-colors" @click="isMenuOpen = false">Breweries</NuxtLink>
          <NuxtLink to="/breweries/random" class="py-2 hover:text-amber-200 transition-colors" @click="isMenuOpen = false">Random Brewery</NuxtLink>
          <NuxtLink to="/search" class="py-2 hover:text-amber-200 transition-colors" @click="isMenuOpen = false">Search</NuxtLink>
          <NuxtLink to="/metadata" class="py-2 hover:text-amber-200 transition-colors" @click="isMenuOpen = false">Metadata</NuxtLink>
          <NuxtLink to="/documentation" class="py-2 hover:text-amber-200 transition-colors" @click="isMenuOpen = false">Documentation</NuxtLink>
          <button @click="toggleDarkMode" class="flex items-center py-2 hover:text-amber-200 transition-colors">
            <span class="mr-2">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
    
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    
    <footer class="bg-amber-500 dark:bg-amber-800 text-white py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p>&copy; {{ new Date().getFullYear() }} Craft Beer</p>
            <p class="text-sm">Powered by <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener" class="underline hover:text-amber-200">OpenBreweryDB</a></p>
          </div>
          <div class="flex space-x-4">
            <a href="https://jpdiaz.dev" class="hover:text-amber-200">
              <span class="sr-only">jpdiaz.dev</span>
              Juan Diaz
            </a>
            <a href="https://github.com/juanpablodiaz/beer" class="hover:text-amber-200">
              <span class="sr-only">GitHub</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/1diazdev/" class="hover:text-amber-200">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false);
const { isDarkMode, toggleDarkMode } = useDarkMode();

// Close mobile menu when window is resized to desktop size
if (process.client) {
  const handleResize = () => {
    if (window.innerWidth >= 768 && isMenuOpen.value) {
      isMenuOpen.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
