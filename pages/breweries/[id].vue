<template>
  <div>
    <Head v-if="brewery">
      <Title>{{ brewery.name }} | Craft Beer</Title>
      <Meta
        name="description"
        :content="`Details about ${brewery.name}, a ${brewery.brewery_type} brewery in ${brewery.city || 'N/A'}, ${brewery.state_province || brewery.state || 'N/A'}.`"
      />
    </Head>

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
      <div class="flex justify-center space-x-4">
        <button
          @click="fetchBrewery"
          class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
        >
          Try Again
        </button>
        <NuxtLink
          to="/breweries"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors"
        >
          Back to Breweries
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="brewery" class="space-y-6">
      <div class="flex justify-between items-start">
        <div>
          <div class="flex items-center">
            <NuxtLink
              to="/breweries"
              class="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </NuxtLink>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ brewery.name }}
            </h1>
          </div>
          <div class="mt-2 flex items-center">
            <span
              class="text-sm font-medium px-2.5 py-0.5 rounded-full mr-2"
              :class="typeClasses"
            >
              {{ formatBreweryType(brewery.brewery_type) }}
            </span>
            <span
              v-if="brewery.city || brewery.state_province || brewery.country"
              class="text-gray-600 dark:text-gray-400"
            >
              {{ formatLocation(brewery) }}
            </span>
          </div>
        </div>
        <button
          @click="fetchRandomBrewery"
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
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          Random Brewery
        </button>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Contact Information
            </h2>
            <div class="space-y-3 text-gray-700 dark:text-gray-300">
              <div
                v-if="brewery.address_1 || brewery.street"
                class="flex items-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 flex-shrink-0 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <div>
                  <p>{{ brewery.address_1 || brewery.street || "N/A" }}</p>
                  <p v-if="brewery.address_2">{{ brewery.address_2 }}</p>
                  <p v-if="brewery.address_3">{{ brewery.address_3 }}</p>
                  <p>
                    {{ brewery.city || "N/A" }},
                    {{ brewery.state_province || brewery.state || "N/A" }}
                    {{ brewery.postal_code || "N/A" }}
                  </p>
                  <p>{{ brewery.country || "N/A" }}</p>
                </div>
              </div>

              <div v-if="brewery.phone" class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{{ formatPhoneNumber(brewery.phone) }}</span>
              </div>

              <div v-if="brewery.website_url" class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <a
                  :href="brewery.website_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-amber-600 dark:text-amber-400 hover:underline"
                >
                  {{ brewery.website_url }}
                </a>
              </div>
            </div>
          </div>

          <div v-if="brewery.longitude && brewery.latitude">
            <h2
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Location
            </h2>
            <div
              class="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center"
            >
              <a
                :href="`https://www.google.com/maps/search/?api=1&query=${brewery.latitude},${brewery.longitude}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex flex-col items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <NuxtLink
          to="/breweries"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors"
        >
          Back to Breweries
        </NuxtLink>

        <div class="flex space-x-3">
          <a
            v-if="brewery.website_url"
            :href="brewery.website_url"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors flex items-center"
          >
            Visit Website
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          <a
            v-if="brewery.longitude && brewery.latitude"
            :href="`https://www.google.com/maps/search/?api=1&query=${brewery.latitude},${brewery.longitude}`"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors flex items-center"
          >
            Directions
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Brewery, BreweryType } from "~/types/brewery";

const route = useRoute();
const router = useRouter();
const breweryId = computed(() => route.params.id as string);

const brewery = ref<Brewery | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

const { getBrewery, getRandomBrewery } = useBreweryApi();

const typeClasses = computed(() => {
  if (!brewery.value) return "";

  const type = brewery.value.brewery_type;

  const classes = {
    micro: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    nano: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    regional:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    brewpub:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    large: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    planning: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    bar: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    contract:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    proprietor: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  };

  return (
    classes[type as BreweryType] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  );
});

const fetchBrewery = async () => {
  loading.value = true;
  error.value = null;

  try {
    brewery.value = await getBrewery(breweryId.value);
  } catch (err) {
    error.value =
      err instanceof Error ? err : new Error("Failed to load brewery details");
    brewery.value = null;
  } finally {
    loading.value = false;
  }
};

const fetchRandomBrewery = async () => {
  loading.value = true;
  error.value = null;

  try {
    const randomBrewery = await getRandomBrewery();
    // Navigate to the random brewery page
    router.push(`/breweries/${randomBrewery.id}`);
  } catch (err) {
    error.value =
      err instanceof Error ? err : new Error("Failed to load random brewery");
  }
};

const formatBreweryType = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const formatLocation = (brewery: Brewery): string => {
  const parts = [];

  if (brewery.city) parts.push(brewery.city);
  if (brewery.state_province || brewery.state)
    parts.push(brewery.state_province || brewery.state);
  if (brewery.country) parts.push(brewery.country);

  return parts.join(", ");
};

const formatPhoneNumber = (phone: string): string => {
  // Basic formatting for US phone numbers
  if (phone.length === 10) {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  }
  return phone;
};

// Watch for route changes to handle navigation between brewery pages
watch(
  () => route.params.id,
  () => {
    fetchBrewery();
  },
  { immediate: false },
);

onMounted(() => {
  fetchBrewery();
});
</script>
