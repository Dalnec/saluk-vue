<template>
  <div class="bg-white rounded-2xl shadow px-4 py-2 mb-2 border border-gray-100 space-y-2">
    <!-- Header -->
    <div class="flex justify-between items-center border-b">
      <h2 class="text-md font-semibold text-blue-700">Consulta - {{ summary.created }}</h2>
      <!-- <span class="text-sm text-gray-500">Dr. {{ doctor }}</span> -->
      <div class="flex items-center gap-1">
        <button
          @click="deleteMedicalRecord(summary.id)"
          class="px-2 p-1 rounded-lg flex items-center gap-2 text-red-500 hover:text-red-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
            <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
            <path fill="currentColor" d="M5 21V6H4V4h5V3h6v1h5v2h-1v15zm2-2h10V6H7zm2-2h2V8H9zm4 0h2V8h-2zM7 6v13z" />
          </svg>
          Eliminar
        </button>
        <button
          @click="showModal = true"
          class="px-2 p-1 rounded-lg flex items-center gap-2 text-amber-500 hover:text-amber-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
            />
          </svg>
          Editar
        </button>
      </div>
    </div>

    <div class="grid md:grid-cols-10 gap-2">
      <!-- Grupo 1: Anamnesis, Signos Vitales, Examen Físico -->
      <div class="col-span-1 md:col-span-4 bg-gray-50 rounded-xl p-2 space-y-1">
        <div>
          <h3 class="text-md font-semibold text-gray-700">🩺 Anamnesis</h3>
          <p class="text-sm text-gray-600">
            {{ (summary.physical_exam && summary.physical_exam.summaryAnamnesis) || "Sin información." }}
          </p>
        </div>
        <div>
          <h3 class="text-md font-semibold text-gray-700">❤️ Signos Vitales</h3>
          <p class="text-sm text-gray-600">
            Temp: {{ (summary.physical_exam && summary.physical_exam.temperature) || "--" }} °C | PA:
            {{ (summary.physical_exam && summary.physical_exam.bloodPressureSystolic) || "--" }}/{{
              (summary.physical_exam && summary.physical_exam.bloodPressureDiastolic) || "--"
            }}
            mmHg | FR: {{ (summary.physical_exam && summary.physical_exam.respiratoryRate) || "--" }} rpm | FC:
            {{ (summary.physical_exam && summary.physical_exam.heartRate) || "--" }} lpm
          </p>
        </div>
        <div>
          <h3 class="text-md font-semibold text-gray-700">🧑‍⚕️ Examen Físico</h3>
          <p class="text-sm text-gray-600">
            {{ (summary.physical_exam && summary.physical_exam.summaryPhysicalExam) || "Sin información." }}
          </p>
        </div>
      </div>
      <div class="col-span-1 md:col-span-3 bg-gray-50 rounded-xl p-2 space-y-1">
        <!-- Grupo 2: Diagnóstico y Tratamiento -->
        <div>
          <h3 class="text-md font-semibold text-gray-700">🧾 Diagnóstico</h3>
          <div v-if="summary.diagnosis" class="list-disc pl-5 text-sm text-gray-600">
            {{ summary.diagnosis.description }}
          </div>
          <p v-else class="text-sm text-gray-500">Sin diagnósticos registrados.</p>
        </div>
        <div>
          <h3 class="text-md font-semibold text-gray-700">💊 Tratamiento</h3>
          <div v-if="summary.treatments" class="list-disc pl-5 text-sm text-gray-600">
            {{ summary.treatments.description }}
          </div>
          <p v-else class="text-sm text-gray-500">Sin tratamiento asignado.</p>
        </div>
      </div>
      <div class="col-span-1 md:col-span-3 bg-gray-50 rounded-xl p-2 space-y-1">
        <!-- Grupo 3: Notas y Observaciones -->
        <div>
          <h3 class="text-md font-semibold text-gray-700">📝 Notas</h3>
          <p class="text-sm text-gray-600">{{ (summary.notes && summary.notes.notes) || "Sin notas." }}</p>
        </div>
        <div>
          <h3 class="text-md font-semibold text-gray-700">🔍 Observaciones</h3>
          <p class="text-sm text-gray-600">
            {{ (summary.notes && summary.notes.observations) || "Sin observaciones." }}
          </p>
        </div>
      </div>
    </div>

    <!-- Grupo 4: Anexos -->
    <div class="bg-gray-50 rounded-xl p-2">
      <h3 class="text-md font-semibold text-gray-700">📎 Anexos</h3>
      <ul
        v-if="summary.attachments && summary.attachments.length"
        class="list-disc pl-5 text-sm text-blue-600 underline"
      >
        <li v-for="(file, index) in summary.attachments" :key="'file-' + index">
          <a :href="file.url" target="_blank">{{ file.name }}</a>
        </li>
      </ul>
      <p v-else class="text-sm text-gray-500">No hay archivos adjuntos.</p>
    </div>
  </div>

  <medical-history-modal
    :show="showModal"
    :history="summary"
    @close="showModal = false"
    @edit-record="emits('edit-record', $event)"
  />
</template>

<script setup>
import { ref } from "vue";
import MedicalHistoryModal from "./MedicalHistoryModal.vue";

defineProps({
  doctor: String,
  summary: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["edit-record", "delete-record"]);

const deleteMedicalRecord = (historyId) => {
  if (confirm("¿Seguro que deseas eliminar este Registro?") === true) {
    emits("delete-record", historyId);
  }
};

const showModal = ref(false);
</script>
