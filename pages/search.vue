<template>
  <div>
    <Head>
      <Title>Search Breweries | Craft Beer</Title>
      <Meta name="description" content="Search for breweries by name, type, or location." />
    </Head>

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Search Breweries</h1>
      <p class="text-gray-600 dark:text-gray-400">Find breweries by name, type, or location.</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <SearchBar 
        ref="searchBarRef"
        placeholder="Search for breweries..."
        @search="onSearch"
        @select="onSelectAutocomplete"
      />
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
        <LoadingSkeleton>
          <div class="flex justify-between">
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/6"></div>
          </div>
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-3"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-3"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6 mb-3"></div>
          <div class="flex justify-end mt-4">
            <div class="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        </LoadingSkeleton>
      </div>
    </div>

    <div v-else-if="error" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
      <p class="text-red-500 mb-4">{{ error.message }}</p>
      <button @click="onSearch(searchQuery)" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors">
        Try Again
      </button>
    </div>

    <div v-else-if="searchPerformed && searchResults.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-600 dark:text-gray-400 mb-4">No breweries found matching "{{ searchQuery }}"</p>
      <p class="text-gray-500 dark:text-gray-500 text-sm mb-6">Try a different search term or check your spelling.</p>
      <button @click="clearSearch" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors">
        Clear Search
      </button>
    </div>

    <template v-else-if="searchResults.length > 0">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Search Results <span class="text-gray-500 dark:text-gray-400 font-normal">({{ searchResults.length }})</span>
        </h2>
        <button @click="clearSearch" class="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm">
          Clear Results
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BreweryCard v-for="brewery in searchResults" :key="brewery.id" :brewery="brewery" />
      </div>
    </template>

    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="text-gray-600 dark:text-gray-400 mb-6">Enter a search term to find breweries.</p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button @click="searchPopularTerm('IPA')" class="px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-md transition-colors hover:bg-amber-200 dark:hover:bg-amber-800">
          Search "IPA"
        </button>
        <button @click="searchPopularTerm('Craft')" class="px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-md transition-colors hover:bg-amber-200 dark:hover:bg-amber-800">
          Search "Craft"
        </button>
        <button @click="searchPopularTerm('Brewing')" class="px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-md transition-colors hover:bg-amber-200 dark:hover:bg-amber-800">
          Search "Brewing"
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Brewery, AutocompleteResult } from '~/types/brewery';
import SearchBar from '~/components/SearchBar.vue';

const route = useRoute();
const router = useRouter();

const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null);
const searchQuery = ref('');
const searchResults = ref<Brewery[]>([]);
const loading = ref(false);
const error = ref<Error | null>(null);
const searchPerformed = ref(false);

const { searchBreweries } = useBreweryApi();

const onSearch = async (query: string) => {
  searchQuery.value = query;
  
  if (!query) {
    searchResults.value = [];
    searchPerformed.value = false;
    // Update URL to remove query parameter
    router.replace({ query: {} });
    return;
  }
  
  loading.value = true;
  error.value = null;
  
  try {
    searchResults.value = await searchBreweries(query);
    searchPerformed.value = true;
    
    // Update URL with search query
    router.replace({ query: { q: query } });
  } catch (err) {
    error.value = err instanceof Error ? err : new Error('Search failed');
    searchResults.value = [];
  } finally {
    loading.value = false;
  }
};

const onSelectAutocomplete = (result: AutocompleteResult) => {
  // Navigate to the brewery page when an autocomplete result is selected
  router.push(`/breweries/${result.id}`);
};

const clearSearch = () => {
  searchQuery.value = '';
  searchResults.value = [];
  searchPerformed.value = false;
  
  // Clear the search input
  if (searchBarRef.value) {
    searchBarRef.value.clearSearch();
  }
  
  // Update URL to remove query parameter
  router.replace({ query: {} });
};

const searchPopularTerm = (term: string) => {
  // Set the search term in the search bar
  if (searchBarRef.value) {
    searchBarRef.value.searchQuery = term;
  }
  
  // Perform the search
  onSearch(term);
};

// Initialize search from URL query parameter
onMounted(() => {
  const query = route.query.q as string;
  if (query) {
    searchQuery.value = query;
    
    // Set the search term in the search bar
    if (searchBarRef.value) {
      searchBarRef.value.searchQuery = query;
    }
    
    // Perform the search
    onSearch(query);
  }
});
</script>
