<template>
  <div>
    <Head>
      <Title>Random Brewery | Craft Beer</Title>
      <Meta
        name="description"
        content="Discover a random brewery from the OpenBreweryDB database."
      />
    </Head>

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Random Brewery
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Discover a new brewery at random. Feeling lucky?
      </p>
    </div>

    <div
      v-if="loading"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
    >
      <LoadingSkeleton>
        <div class="h-8 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
        <div class="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-3"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-3"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6 mb-6"></div>
        <div class="grid grid-cols-2 gap-4">
          <div class="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div class="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </LoadingSkeleton>
    </div>

    <div
      v-else-if="error"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center"
    >
      <p class="text-red-500 mb-4">{{ error.message }}</p>
      <button
        @click="fetchRandomBrewery"
        class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
      >
        Try Again
      </button>
    </div>

    <div v-else-if="randomBrewery" class="space-y-6">
      <BreweryCard :brewery="randomBrewery" />

      <div class="flex justify-center">
        <button
          @click="fetchRandomBrewery"
          class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors shadow-md flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
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
          Get Another Random Brewery
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Brewery } from "~/types/brewery";

const randomBrewery = ref<Brewery | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

const { getRandomBrewery } = useBreweryApi();

const fetchRandomBrewery = async () => {
  loading.value = true;
  error.value = null;

  try {
    randomBrewery.value = await getRandomBrewery();
  } catch (err) {
    error.value =
      err instanceof Error ? err : new Error("Failed to load random brewery");
    randomBrewery.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRandomBrewery();
});
</script>
