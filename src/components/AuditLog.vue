<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold mb-4">Registro de Auditoría</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-50">
          <tr>
            <th class="py-2 px-4 border-b">Timestamp</th>
            <th class="py-2 px-4 border-b">Usuario</th>
            <th class="py-2 px-4 border-b">Acción</th>
            <th class="py-2 px-4 border-b">Paciente</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log.timestamp" class="hover:bg-gray-100">
            <td class="py-2 px-4 border-b">{{ log.timestamp }}</td>
            <td class="py-2 px-4 border-b">{{ log.user }}</td>
            <td class="py-2 px-4 border-b">{{ log.action }}</td>
            <td class="py-2 px-4 border-b">{{ log.patient }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  logs: {
    type: Array,
    required: true,
  },
});
</script>
