<template>
  <div>
    <Head>
      <Title>Breweries | Craft Beer Explorer</Title>
      <Meta name="description" content="Browse and filter breweries from around the world." />
    </Head>

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Breweries</h1>
      <p class="text-gray-600 dark:text-gray-400">Browse and filter breweries from around the world.</p>
    </div>

    <BreweryFilters @filter-change="onFilterChange" ref="filtersRef" />

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
      <button @click="fetchBreweries" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors">
        Try Again
      </button>
    </div>

    <div v-else-if="breweries.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
      <p class="text-gray-600 dark:text-gray-400 mb-4">No breweries found with the current filters.</p>
      <button @click="resetFilters" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors">
        Reset Filters
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BreweryCard v-for="brewery in breweries" :key="brewery.id" :brewery="brewery" />
    </div>

    <Pagination 
      v-if="breweries.length > 0" 
      :current-page="currentPage" 
      :total-items="totalItems" 
      :per-page="perPage"
      @page-change="onPageChange"
      class="mt-8"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Brewery, BrewerySearchParams } from '~/types/brewery';

const route = useRoute();
const router = useRouter();

const breweries = ref<Brewery[]>([]);
const loading = ref(true);
const error = ref<Error | null>(null);
const totalItems = ref(200); // API doesn't provide total count, using an estimate
const currentPage = ref(1);
const perPage = ref(20);
const filtersRef = ref<InstanceType<typeof BreweryFilters> | null>(null);

const { getBreweries } = useBreweryApi();

// Initialize filters from URL query parameters
const initFiltersFromQuery = () => {
  const query = route.query;
  
  if (filtersRef.value) {
    // Update filter values from URL query parameters
    if (query.by_type) filtersRef.value.filters.by_type = query.by_type as string;
    if (query.by_city) filtersRef.value.filters.by_city = query.by_city as string;
    if (query.by_state) filtersRef.value.filters.by_state = query.by_state as string;
    if (query.by_country) filtersRef.value.filters.by_country = query.by_country as string;
    if (query.sort) filtersRef.value.filters.sort = query.sort as 'asc' | 'desc';
    if (query.page) currentPage.value = parseInt(query.page as string) || 1;
    if (query.per_page) {
      const pp = parseInt(query.per_page as string);
      if ([10, 20, 30, 50].includes(pp)) {
        perPage.value = pp;
        filtersRef.value.filters.per_page = pp;
      }
    }
  }
};

const fetchBreweries = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const params: BrewerySearchParams = {
      page: currentPage.value,
      per_page: perPage.value,
    };
    
    // Add filter parameters if they exist
    if (filtersRef.value) {
      const filters = filtersRef.value.filters;
      if (filters.by_type) params.by_type = filters.by_type;
      if (filters.by_city) params.by_city = filters.by_city;
      if (filters.by_state) params.by_state = filters.by_state;
      if (filters.by_country) params.by_country = filters.by_country;
      if (filters.sort) params.sort = filters.sort;
    }
    
    breweries.value = await getBreweries(params);
    
    // Update URL with current filters
    updateUrlWithFilters();
  } catch (err) {
    error.value = err instanceof Error ? err : new Error('Failed to load breweries');
    breweries.value = [];
  } finally {
    loading.value = false;
  }
};

const onFilterChange = (filters: BrewerySearchParams) => {
  currentPage.value = filters.page || 1;
  perPage.value = filters.per_page || 20;
  fetchBreweries();
};

const onPageChange = (page: number) => {
  currentPage.value = page;
  if (filtersRef.value) {
    filtersRef.value.filters.page = page;
  }
  fetchBreweries();
  
  // Scroll to top when page changes
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetFilters = () => {
  if (filtersRef.value) {
    filtersRef.value.resetFilters();
  }
};

const updateUrlWithFilters = () => {
  if (!filtersRef.value) return;
  
  const filters = filtersRef.value.filters;
  const query: Record<string, string> = {};
  
  if (filters.by_type) query.by_type = filters.by_type;
  if (filters.by_city) query.by_city = filters.by_city;
  if (filters.by_state) query.by_state = filters.by_state;
  if (filters.by_country) query.by_country = filters.by_country;
  if (filters.sort) query.sort = filters.sort;
  if (currentPage.value > 1) query.page = currentPage.value.toString();
  if (perPage.value !== 20) query.per_page = perPage.value.toString();
  
  // Update URL without reloading the page
  router.replace({ query });
};

// Watch for route query changes (e.g., when user navigates with browser back/forward buttons)
watch(() => route.query, () => {
  initFiltersFromQuery();
  fetchBreweries();
}, { deep: true });

onMounted(() => {
  // Initialize filters from URL and fetch breweries
  nextTick(() => {
    initFiltersFromQuery();
    fetchBreweries();
  });
});
</script>
