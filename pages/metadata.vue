<template>
  <div>
    <Head>
      <Title>Brewery Metadata | Craft Beer</Title>
      <Meta
        name="description"
        content="View metadata and statistics about breweries in the OpenBreweryDB database."
      />
    </Head>

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Brewery Metadata
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Statistics and insights about the OpenBreweryDB database.
      </p>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="i in 4"
        :key="i"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <LoadingSkeleton>
          <div
            class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"
          ></div>
          <div
            class="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-3"
          ></div>
          <div
            class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"
          ></div>
          <div class="h-24 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </LoadingSkeleton>
      </div>
    </div>

    <div
      v-else-if="error"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center"
    >
      <p class="text-red-500 mb-4">{{ error.message }}</p>
      <button
        @click="fetchMetadata"
        class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
      >
        Try Again
      </button>
    </div>

    <div v-else-if="metadata" class="space-y-6">
      <!-- Overview Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Breweries
          </h2>
          <div
            class="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2"
          >
            {{ metadata.total.toLocaleString() }}
          </div>
          <p class="text-gray-600 dark:text-gray-400">
            Breweries in the database
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Cities
          </h2>
          <div
            class="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2"
          >
            {{ metadata.city_count.toLocaleString() }}
          </div>
          <p class="text-gray-600 dark:text-gray-400">Cities with breweries</p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            States/Provinces
          </h2>
          <div
            class="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2"
          >
            {{ metadata.state_count.toLocaleString() }}
          </div>
          <p class="text-gray-600 dark:text-gray-400">
            States/provinces with breweries
          </p>
        </div>
      </div>

      <!-- Brewery Types Distribution -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Brewery Types Distribution
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Bar Chart -->
          <div class="h-80 flex items-end space-x-2">
            <template v-for="(count, type) in sortedBreweryTypes" :key="type">
              <div class="flex flex-col items-center">
                <div class="text-xs font-medium mb-1">{{ count }}</div>
                <div
                  class="w-10 rounded-t-md transition-all duration-500"
                  :class="getTypeColor(type as string)"
                  :style="{ height: `${(count / maxTypeCount) * 100}%` }"
                ></div>
                <div
                  class="text-xs mt-1 transform -rotate-45 origin-top-left whitespace-nowrap"
                >
                  {{ formatBreweryType(type as string) }}
                </div>
              </div>
            </template>
          </div>

          <!-- Legend -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="(count, type) in metadata.type_count"
              :key="type"
              class="flex items-center"
            >
              <div
                class="w-4 h-4 rounded-full mr-2"
                :class="getTypeColor(type)"
              ></div>
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ formatBreweryType(type) }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ count.toLocaleString() }} breweries
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Countries Distribution -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Countries
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          There are breweries in {{ metadata.country_count }} countries in the
          database.
        </p>

        <div class="flex justify-center">
          <NuxtLink
            to="/breweries"
            class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
          >
            Browse All Breweries
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { BreweryMetadata, BreweryType } from "~/types/brewery";

const metadata = ref<BreweryMetadata | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

const { getMetadata } = useBreweryApi();

const sortedBreweryTypes = computed(() => {
  if (!metadata.value) return {};

  // Sort brewery types by count (descending)
  return Object.fromEntries(
    Object.entries(metadata.value.type_count).sort(
      ([, countA], [, countB]) => countB - countA,
    ),
  );
});

const maxTypeCount = computed(() => {
  if (!metadata.value) return 0;
  return Math.max(...Object.values(metadata.value.type_count));
});

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    micro: "bg-green-500 dark:bg-green-600",
    nano: "bg-blue-500 dark:bg-blue-600",
    regional: "bg-purple-500 dark:bg-purple-600",
    brewpub: "bg-amber-500 dark:bg-amber-600",
    large: "bg-red-500 dark:bg-red-600",
    planning: "bg-gray-500 dark:bg-gray-600",
    bar: "bg-indigo-500 dark:bg-indigo-600",
    contract: "bg-yellow-500 dark:bg-yellow-600",
    proprietor: "bg-pink-500 dark:bg-pink-600",
    closed: "bg-gray-400 dark:bg-gray-500",
  };

  return colors[type as BreweryType] || "bg-gray-500 dark:bg-gray-600";
};

const formatBreweryType = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const fetchMetadata = async () => {
  loading.value = true;
  error.value = null;

  try {
    metadata.value = await getMetadata();
  } catch (err) {
    error.value =
      err instanceof Error ? err : new Error("Failed to load brewery metadata");
    metadata.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMetadata();
});
</script>
