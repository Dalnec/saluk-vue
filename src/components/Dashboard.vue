
<template>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-white rounded-lg shadow-md p-6"
    >
      <div class="flex items-center gap-3">
        <div :class="'p-3 rounded-full ' + stat.bgColor">
          <i :class="stat.icon + ' text-2xl ' + stat.iconColor"></i>
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-800">{{ stat.value }}</p>
          <p class="text-gray-600">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
  }
});
</script>
