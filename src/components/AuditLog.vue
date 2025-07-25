
<template>
  <section class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <i class="fas fa-shield-alt"></i>
      Registro de Auditoría
    </h2>
    <div class="space-y-3">
      <div
        v-for="log in logs"
        :key="log.timestamp"
        class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
      >
        <i class="fas fa-clock text-gray-500"></i>
        <div class="flex-1">
          <p class="text-sm">
            <span class="font-medium">{{ log.user }}</span> realizó "{{ log.action }}"
            <span v-if="log.patient"> en el paciente <span class="font-medium">{{ log.patient }}</span></span>
          </p>
          <p class="text-xs text-gray-500">{{ log.timestamp }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  logs: {
    type: Array,
    required: true
  }
});
</script>
