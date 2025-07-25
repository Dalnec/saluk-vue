
<template>
  <nav class="bg-white border-b">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex gap-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="$emit('update:modelValue', tab.id)"
          :class="[
            'flex items-center gap-2 px-4 py-3 border-b-2 transition-colors',
            modelValue === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'
          ]"
        >
          <i :class="tab.icon + ' text-base'"></i>
          <span>{{ tab.label }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  tabs: Array,
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>
