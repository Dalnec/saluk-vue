
<template>
  <header class="bg-white shadow-sm border-b p-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center gap-3">
        <i class="fas fa-heart text-red-500 text-2xl"></i>
        <h1 class="text-2xl font-bold text-gray-800">MedSystem</h1>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <p class="text-sm font-medium text-gray-800">{{ user.name }}</p>
          <p class="text-xs text-gray-600">{{ user.role }}</p>
        </div>
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
          <span>{{ initials }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  },
  initials: {
    type: String,
    required: true
  }
});
</script>
