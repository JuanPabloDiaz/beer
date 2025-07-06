<template>
  <div class="relative w-full">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        class="w-full px-4 py-3 pl-10 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-600 dark:focus:border-amber-600 transition-all"
        :placeholder="placeholder"
        @input="onInput"
        @focus="isFocused = true"
        @blur="onBlur"
      />
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
        aria-label="Clear search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Autocomplete Results -->
    <div
      v-if="isFocused && searchQuery && autocompleteResults.length > 0"
      class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <ul class="py-1">
        <li
          v-for="result in autocompleteResults"
          :key="result.id"
          @mousedown="selectResult(result)"
          class="px-4 py-2 hover:bg-amber-100 dark:hover:bg-amber-900 cursor-pointer text-gray-900 dark:text-white"
        >
          {{ result.name }}
        </li>
      </ul>
    </div>

    <!-- Loading indicator -->
    <div v-if="loading" class="absolute right-12 top-3">
      <svg class="animate-spin h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { AutocompleteResult } from '~/types/brewery';

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search breweries...'
  },
  minChars: {
    type: Number,
    default: 2
  },
  debounceMs: {
    type: Number,
    default: 300
  }
});

const emit = defineEmits(['search', 'select']);

const searchQuery = ref('');
const autocompleteResults = ref<AutocompleteResult[]>([]);
const isFocused = ref(false);
const loading = ref(false);
const debounceTimeout = ref<NodeJS.Timeout | null>(null);

const { getAutocomplete } = useBreweryApi();

const onInput = () => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }

  if (searchQuery.value.length >= props.minChars) {
    loading.value = true;
    debounceTimeout.value = setTimeout(async () => {
      try {
        autocompleteResults.value = await getAutocomplete(searchQuery.value);
      } catch (error) {
        console.error('Error fetching autocomplete results:', error);
        autocompleteResults.value = [];
      } finally {
        loading.value = false;
      }
    }, props.debounceMs);
  } else {
    autocompleteResults.value = [];
    loading.value = false;
  }
};

const selectResult = (result: AutocompleteResult) => {
  searchQuery.value = result.name;
  autocompleteResults.value = [];
  emit('select', result);
  emit('search', searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = '';
  autocompleteResults.value = [];
  emit('search', '');
};

const onBlur = () => {
  // Small delay to allow click events on autocomplete items
  setTimeout(() => {
    isFocused.value = false;
  }, 200);
};

// Expose search query and methods to parent components
defineExpose({
  searchQuery,
  clearSearch
});
</script>
