<template>
  <div>
    <Head>
      <Title>Home | Craft Beer</Title>
      <Meta
        name="description"
        content="Explore craft breweries around the world with our modern brewery directory."
      />
    </Head>

    <section
      class="py-12 px-4 text-center bg-gradient-to-b from-amber-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-inner-lg mb-10"
    >
      <h1
        class="text-4xl md:text-5xl font-bold text-amber-800 dark:text-amber-400 mb-4"
      >
        Craft Beer
      </h1>
      <p
        class="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8"
      >
        Discover the world's finest craft breweries using the OpenBreweryDB API.
        Find local brewpubs, microbreweries, and more!
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink
          to="/breweries"
          class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors shadow-md"
        >
          Browse Breweries
        </NuxtLink>
        <NuxtLink
          to="/documentation"
          class="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-amber-600 dark:text-amber-400 font-medium rounded-lg transition-colors shadow-md border border-amber-200 dark:border-gray-700"
        >
          View Documentation
        </NuxtLink>
      </div>
    </section>

    <section class="mb-10">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Featured Brewery
        </h2>
        <button
          @click="refreshRandomBrewery"
          class="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          New Random
        </button>
      </div>

      <div
        v-if="loading"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
      >
        <LoadingSkeleton>
          <div
            class="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"
          ></div>
          <div
            class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-3"
          ></div>
          <div
            class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-3"
          ></div>
          <div
            class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6 mb-3"
          ></div>
          <div
            class="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mt-4"
          ></div>
        </LoadingSkeleton>
      </div>

      <div
        v-else-if="error"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center"
      >
        <p class="text-red-500 mb-4">{{ error.message }}</p>
        <button
          @click="refreshRandomBrewery"
          class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>

      <BreweryCard v-else-if="randomBrewery" :brewery="randomBrewery" />
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Quick Search
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <SearchBar @search="onSearch" />

        <div v-if="searchLoading" class="mt-6">
          <LoadingSkeleton />
          <LoadingSkeleton class="mt-4" />
        </div>

        <div v-else-if="searchResults.length > 0" class="mt-6 space-y-4">
          <div
            v-for="brewery in searchResults.slice(0, 3)"
            :key="brewery.id"
            class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
          >
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ brewery.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ brewery.city }}, {{ brewery.state_province || brewery.state }}
            </p>
            <div class="mt-2">
              <NuxtLink
                :to="`/breweries/${brewery.id}`"
                class="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm font-medium"
              >
                View Details →
              </NuxtLink>
            </div>
          </div>

          <div v-if="searchResults.length > 3" class="text-center pt-4">
            <NuxtLink
              to="/search"
              class="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium"
            >
              View all {{ searchResults.length }} results →
            </NuxtLink>
          </div>
        </div>

        <div
          v-else-if="searchQuery && !searchLoading"
          class="mt-6 text-center py-8"
        >
          <p class="text-gray-600 dark:text-gray-400">
            No breweries found matching "{{ searchQuery }}"
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Explore By Type
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <NuxtLink
          v-for="type in breweryTypes"
          :key="type.value"
          :to="`/breweries?by_type=${type.value}`"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
        >
          <div class="text-2xl mb-2">{{ type.emoji }}</div>
          <h3 class="font-medium text-gray-900 dark:text-white">
            {{ type.label }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ type.description }}
          </p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Brewery } from "~/types/brewery";

// Random brewery state
const randomBrewery = ref<Brewery | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

// Search state
const searchQuery = ref("");
const searchResults = ref<Brewery[]>([]);
const searchLoading = ref(false);

const { getRandomBrewery, searchBreweries } = useBreweryApi();

const breweryTypes = [
  {
    value: "micro",
    label: "Micro",
    emoji: "🍺",
    description: "Small craft breweries",
  },
  {
    value: "nano",
    label: "Nano",
    emoji: "🧪",
    description: "Very small batch breweries",
  },
  {
    value: "regional",
    label: "Regional",
    emoji: "🏭",
    description: "Regional distribution breweries",
  },
  {
    value: "brewpub",
    label: "Brewpub",
    emoji: "🍽️",
    description: "Restaurant-breweries",
  },
  {
    value: "large",
    label: "Large",
    emoji: "🏢",
    description: "Mass production breweries",
  },
];

const fetchRandomBrewery = async () => {
  loading.value = true;
  error.value = null;

  try {
    randomBrewery.value = await getRandomBrewery();
  } catch (err) {
    error.value =
      err instanceof Error ? err : new Error("Failed to load brewery");
    randomBrewery.value = null;
  } finally {
    loading.value = false;
  }
};

const refreshRandomBrewery = () => {
  fetchRandomBrewery();
};

const onSearch = async (query: string) => {
  searchQuery.value = query;

  if (!query) {
    searchResults.value = [];
    return;
  }

  searchLoading.value = true;

  try {
    searchResults.value = await searchBreweries(query);
  } catch (err) {
    console.error("Search error:", err);
    searchResults.value = [];
  } finally {
    searchLoading.value = false;
  }
};

onMounted(() => {
  fetchRandomBrewery();
});
</script>
