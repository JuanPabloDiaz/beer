<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
      <h3
        class="text-lg font-medium text-gray-900 dark:text-white mb-2 md:mb-0"
      >
        Filter Breweries
      </h3>
      <button
        @click="resetFilters"
        class="text-sm text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 font-medium"
        aria-label="Reset all filters"
      >
        Reset Filters
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Type Filter -->
      <div class="space-y-2">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Brewery Type</label
        >
        <select
          v-model="filters.by_type"
          class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          @change="applyFilters"
        >
          <option value="">All Types</option>
          <option value="micro">Micro</option>
          <option value="nano">Nano</option>
          <option value="regional">Regional</option>
          <option value="brewpub">Brewpub</option>
          <option value="large">Large</option>
          <option value="planning">Planning</option>
          <option value="bar">Bar</option>
          <option value="contract">Contract</option>
          <option value="proprietor">Proprietor</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <!-- City Filter -->
      <div class="space-y-2">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >City</label
        >
        <input
          v-model="filters.by_city"
          type="text"
          placeholder="Enter city name"
          class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          @input="debounceApplyFilters"
        />
      </div>

      <!-- State Filter -->
      <div class="space-y-2">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >State</label
        >
        <input
          v-model="filters.by_state"
          type="text"
          placeholder="Enter state name"
          class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          @input="debounceApplyFilters"
        />
      </div>

      <!-- Country Filter -->
      <div class="space-y-2">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Country</label
        >
        <input
          v-model="filters.by_country"
          type="text"
          placeholder="Enter country name"
          class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          @input="debounceApplyFilters"
        />
      </div>
    </div>

    <!-- Sorting and Pagination -->
    <div class="mt-6 flex flex-col md:flex-row md:items-center justify-between">
      <div class="mb-4 md:mb-0 flex items-center">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
          >Sort:</label
        >
        <select
          v-model="filters.sort"
          class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          @change="applyFilters"
        >
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
      </div>

      <div class="flex items-center">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
          >Per page:</label
        >
        <select
          v-model="filters.per_page"
          class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          @change="applyFilters"
        >
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="30">30</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { BrewerySearchParams } from "~/types/brewery";

const emit = defineEmits(["filter-change"]);

const defaultFilters: BrewerySearchParams = {
  by_city: "",
  by_state: "",
  by_country: "",
  by_type: undefined,
  sort: "asc",
  per_page: 20,
  page: 1,
};

const filters = reactive<BrewerySearchParams>({ ...defaultFilters });
const debounceTimer = ref<NodeJS.Timeout | null>(null);

const debounceApplyFilters = () => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }

  debounceTimer.value = setTimeout(() => {
    applyFilters();
  }, 500);
};

const applyFilters = () => {
  // Reset to page 1 when filters change
  filters.page = 1;
  emit("filter-change", { ...filters });
};

const resetFilters = () => {
  // Reset all filters to default values
  Object.assign(filters, defaultFilters);
  applyFilters();
};

// Expose filters to parent components
defineExpose({
  filters,
  resetFilters,
});
</script>
