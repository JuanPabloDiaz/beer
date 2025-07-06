<template>
  <div class="flex flex-col sm:flex-row items-center justify-between mt-6">
    <div class="mb-3 sm:mb-0 text-sm text-gray-700 dark:text-gray-300">
      Showing <span class="font-medium">{{ startItem }}</span> to <span class="font-medium">{{ endItem }}</span> of <span class="font-medium">{{ totalItems }}</span> results
    </div>
    
    <nav class="flex items-center space-x-1">
      <button 
        @click="onPageChange(currentPage - 1)" 
        :disabled="currentPage === 1"
        aria-label="Go to previous page"
        :class="[
          'px-3 py-1 rounded-md',
          currentPage === 1 
            ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900'
        ]"
      >
        <span class="sr-only">Previous</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <template v-for="page in displayedPages" :key="page">
        <button
          v-if="page !== '...'"
          @click="onPageChange(page as number)"
          :aria-label="`Go to page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
          :class="[
            'px-3 py-1 rounded-md',
            page === currentPage
              ? 'bg-amber-500 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900'
          ]"
        >
          {{ page }}
        </button>
        <span 
          v-else 
          class="px-3 py-1 text-gray-700 dark:text-gray-300"
        >
          ...
        </span>
      </template>
      
      <button 
        @click="onPageChange(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        aria-label="Go to next page"
        :class="[
          'px-3 py-1 rounded-md',
          currentPage === totalPages 
            ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900'
        ]"
      >
        <span class="sr-only">Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  maxVisiblePages: {
    type: Number,
    default: 5
  }
});

const emit = defineEmits(['page-change']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage));

const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (props.currentPage - 1) * props.perPage + 1;
});

const endItem = computed(() => {
  const end = props.currentPage * props.perPage;
  return end > props.totalItems ? props.totalItems : end;
});

const displayedPages = computed(() => {
  if (totalPages.value <= props.maxVisiblePages) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }
  
  const pages: (number | string)[] = [];
  
  // Always show first page
  pages.push(1);
  
  // Calculate start and end of visible page range
  let startPage = Math.max(2, props.currentPage - Math.floor(props.maxVisiblePages / 2));
  let endPage = Math.min(totalPages.value - 1, startPage + props.maxVisiblePages - 3);
  
  // Adjust if we're near the end
  if (endPage <= startPage) {
    startPage = Math.max(2, totalPages.value - props.maxVisiblePages + 2);
    endPage = totalPages.value - 1;
  }
  
  // Add ellipsis if needed
  if (startPage > 2) {
    pages.push('...');
  }
  
  // Add visible page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  // Add ellipsis if needed
  if (endPage < totalPages.value - 1) {
    pages.push('...');
  }
  
  // Always show last page
  if (totalPages.value > 1) {
    pages.push(totalPages.value);
  }
  
  return pages;
});

const onPageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  emit('page-change', page);
};
</script>
