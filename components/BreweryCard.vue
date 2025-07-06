<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="p-5">
      <div class="flex justify-between items-start">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ brewery.name }}</h3>
        <span 
          class="text-xs font-medium px-2.5 py-0.5 rounded-full"
          :class="typeClasses"
        >
          {{ formatBreweryType(brewery.brewery_type) }}
        </span>
      </div>
      
      <div class="mt-3 text-gray-700 dark:text-gray-300 space-y-2">
        <div v-if="brewery.city || brewery.state_province || brewery.country" class="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>
            {{ formatLocation(brewery) }}
          </span>
        </div>
        
        <div v-if="brewery.phone" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>{{ formatPhoneNumber(brewery.phone) }}</span>
        </div>
        
        <div v-if="brewery.website_url" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <a :href="brewery.website_url" target="_blank" rel="noopener noreferrer" class="text-amber-600 dark:text-amber-400 hover:underline truncate max-w-[200px] inline-block">
            {{ formatWebsiteUrl(brewery.website_url) }}
          </a>
        </div>
      </div>
      
      <div class="mt-5 flex justify-end">
        <NuxtLink 
          :to="`/breweries/${brewery.id}`"
          class="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-md transition-colors"
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Brewery, BreweryType } from '~/types/brewery';

const props = defineProps<{
  brewery: Brewery;
}>();

const typeClasses = computed(() => {
  const type = props.brewery.brewery_type;
  
  const classes = {
    'micro': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'nano': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'regional': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'brewpub': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    'large': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'planning': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    'bar': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    'contract': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'proprietor': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    'closed': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  };
  
  return classes[type as BreweryType] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
});

const formatBreweryType = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const formatLocation = (brewery: Brewery): string => {
  const parts = [];
  
  if (brewery.city) parts.push(brewery.city);
  if (brewery.state_province) parts.push(brewery.state_province);
  if (brewery.country) parts.push(brewery.country);
  
  return parts.join(', ');
};

const formatPhoneNumber = (phone: string): string => {
  // Basic formatting for US phone numbers
  if (phone.length === 10) {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  }
  return phone;
};

const formatWebsiteUrl = (url: string): string => {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (e) {
    return url;
  }
};
</script>
