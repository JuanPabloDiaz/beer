<template>
  <div class="animate-pulse" :class="{ 'opacity-75': true }">
    <slot>
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2.5"></div>
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2.5"></div>
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-2.5"></div>
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  count: {
    type: Number,
    default: 1,
  },
});
</script>
