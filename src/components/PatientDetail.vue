<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <button @click="$emit('back')" class="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2">
      <i class="fas fa-arrow-left"></i> Volver a la lista
    </button>
    <h2 class="text-2xl font-bold mb-4">{{ patient.name }}</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <h3 class="font-semibold mb-2">Información</h3>
        <p><strong>Edad:</strong> {{ patient.age }}</p>
        <p><strong>Género:</strong> {{ patient.gender }}</p>
        <p><strong>Teléfono:</strong> {{ patient.phone }}</p>
        <p><strong>Email:</strong> {{ patient.email }}</p>
      </div>
      <div>
        <div class="bg-red-50 rounded-lg p-4">
          <h3 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v4m-7.621 2.2c-.91 1.575-1.364 2.363-1.296 3.01a2 2 0 0 0 .813 1.408C4.422 20 5.331 20 7.15 20h9.703c1.817 0 2.726 0 3.251-.382a2 2 0 0 0 .814-1.409c.068-.646-.386-1.434-1.296-3.01l-4.85-8.4c-.909-1.574-1.364-2.362-1.958-2.626a2 2 0 0 0-1.627 0c-.593.264-1.048 1.052-1.957 2.625zm7.672.8v.1h-.1V16z"
              />
            </svg>
            Alergias
          </h3>
          <ul class="list-disc list-inside text-red-600 space-y-1">
            <li v-for="allergy in patient.allergies" :key="allergy">{{ allergy }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-blue-50 rounded-lg p-4 mt-2">
      <h3 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
        Medicamentos Actuales
      </h3>

      <div class="bg-white p-3 rounded border-l-4 border-blue-500">
        <p class="font-medium text-sm text-gray-800">Ibuprofeno 400mg</p>
        <p class="text-xs text-gray-600">1 cada 8 horas</p>
        <p class="text-xs text-gray-500">Prescrito por: Dr. María González</p>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8 17q.425 0 .713-.288T9 16t-.288-.712T8 15t-.712.288T7 16t.288.713T8 17m0-4q.425 0 .713-.288T9 12t-.288-.712T8 11t-.712.288T7 12t.288.713T8 13m0-4q.425 0 .713-.288T9 8t-.288-.712T8 7t-.712.288T7 8t.288.713T8 9m3 8h6v-2h-6zm0-4h6v-2h-6zm0-4h6V7h-6zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"
          />
        </svg>
        Historial Médico
      </h3>

      <div
        v-for="(item, index) in patient.medicalHistory"
        :key="index"
        class="bg-gray-50 rounded-md p-4 mb-3 flex justify-between items-start text-sm"
      >
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full">
              {{ item.type }}
            </span>
            <span class="text-gray-500 text-xs">{{ item.date }}</span>
          </div>
          <p class="text-gray-800 mb-1">{{ item.description }}</p>
        </div>
        <div class="text-xs text-gray-500 whitespace-nowrap">
          {{ item.doctor }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  patient: {
    type: Object,
    required: true,
  },
});
defineEmits(["back"]);
</script>
