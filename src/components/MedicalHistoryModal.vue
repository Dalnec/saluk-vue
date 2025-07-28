<template>
  <div v-if="show" class="fixed w-full h-full top-0 left-0 flex items-center justify-center" @click.self="close">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div
      class="modal-container bg-white w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto rounded shadow-lg z-50 h-11/12 overflow-y-auto"
    >
      <div class="modal-content py-4 text-left px-6">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-xl font-semibold text-blue-700">Consulta - {{ history.created }}</h1>
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              class="hover:bg-gray-100 p-1 rounded-full text-gray-600 hover:text-gray-800 cursor-pointer"
              @click="close"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
              />
            </svg>
          </button>
        </div>
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-4 border-b">Exámen Físico</h3>
          <!-- Anamnesis Section -->
          <div class="mb-2">
            <h4 class="font-semibold mb-2 text-gray-800">Anamnesis</h4>
            <label for="resumenAnamnesis" class="block text-sm font-medium text-gray-700 mb-1">Resumen Anamnesis</label>
            <textarea
              id="resumenAnamnesis"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              v-model="history.physical_exam.summaryAnamnesis"
            ></textarea>
          </div>

          <!-- Examen Físico Section -->
          <div>
            <h4 class="font-semibold mb-2 text-gray-800">Signos Vitales</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mb-4">
              <div class="flex items-center">
                <label for="temp" class="mr-2 font-medium text-sm text-gray-700">Temp:</label>
                <input
                  type="text"
                  id="temp"
                  class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  v-model="history.physical_exam.temperature"
                />
              </div>
              <div class="flex items-center">
                <label for="pa" class="mr-2 font-medium text-sm text-gray-700">PA:</label>
                <div class="flex items-center flex-1">
                  <input
                    type="text"
                    id="pa"
                    class="w-1/2 p-2 border border-gray-300 rounded-l-md shadow-sm"
                    v-model="history.physical_exam.bloodPressureSystolic"
                  />
                  <span class="px-2 bg-gray-100 border-t border-b border-gray-300">/</span>
                  <input
                    type="text"
                    id="pa2"
                    class="w-1/2 p-2 border border-gray-300 rounded-r-md shadow-sm"
                    v-model="history.physical_exam.bloodPressureDiastolic"
                  />
                </div>
              </div>
              <div class="flex items-center">
                <label for="fr" class="mr-2 font-medium text-sm text-gray-700">FR:</label>
                <input
                  type="text"
                  id="fr"
                  class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  v-model="history.physical_exam.respiratoryRate"
                />
              </div>
              <div class="flex items-center">
                <label for="fc" class="mr-2 font-medium text-sm text-gray-700">FC:</label>
                <input
                  type="text"
                  id="fc"
                  class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  v-model="history.physical_exam.heartRate"
                />
              </div>
            </div>
            <label for="resumenExamenFisico" class="block text-sm font-medium text-gray-700 mb-1">
              Resumen Examen Físico
            </label>
            <textarea
              id="resumenExamenFisico"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              v-model="history.physical_exam.summaryPhysicalExam"
            ></textarea>
          </div>
        </div>

        <!-- <div  class="mb-4">
          <h3 class="text-lg font-semibold mb-2 border-b">Apoyo al Diagnóstico</h3>
          <p>Contenido de apoyo al diagnóstico...</p>
        </div> -->

        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2 border-b">Diagnóstico/Tratamiento</h3>
          <!-- Diagnóstico Section -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-md font-semibold mb-2">Diagnóstico</h4>
              <!-- <button
                @click="showDiagnosisModal = true"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded"
              >
                Agregar
              </button> -->
            </div>
            <!-- <div class="overflow-x-auto">
              <table class="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr class="bg-gray-100">
                    <th
                      class="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      CIEX
                    </th>
                    <th
                      class="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Descripción del Diagnóstico
                    </th>
                    <th
                      class="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Tipo de diagnóstico
                    </th>
                    <th
                      class="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(diagnosis, index) in history.diagnosis" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                      {{ diagnosis.ciex }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                      {{ diagnosis.description }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                      {{ diagnosis.kind }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                      <button @click="deleteDiagnosis(index, diagnosis.id)" class="text-red-500 hover:text-red-700">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> -->
            <textarea
              id="notas"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              v-model="history.diagnosis.description"
            ></textarea>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-md font-semibold mb-2">Tratamiento</h4>
              <!-- <button
                @click="showTreatmentModal = true"
                class="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded"
              >
                Agregar
              </button> -->
            </div>
            <!-- <div class="overflow-x-auto">
              <table class="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr class="bg-gray-100">
                    <th
                      class="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Descripción
                    </th>
                    <th
                      class="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Concentración
                    </th>
                    <th
                      class="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Presentación
                    </th>
                    <th
                      class="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(treatment, index) in history.treatments" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                      {{ treatment.description }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                      {{ treatment.concentration }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                      {{ treatment.presentation }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                      <button @click="deleteTreatment(index, treatment.id)" class="text-red-500 hover:text-red-700">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> -->
            <textarea
              id="notas"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              v-model="history.treatments.description"
            ></textarea>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2 border-b">Notas y Observaciones</h3>
          <div class="space-y-4">
            <div>
              <label for="notas" class="block text-md font-medium text-gray-700 mb-1">Notas</label>
              <textarea
                id="notas"
                rows="4"
                class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                v-model="history.notes.notes"
              ></textarea>
            </div>
            <div>
              <label for="observaciones" class="block text-md font-medium text-gray-700 mb-1">Observaciones</label>
              <textarea
                id="observaciones"
                rows="4"
                class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                v-model="history.notes.observations"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="mt-8 flex justify-end gap-4">
          <button
            @click="close"
            class="px-4 py-2 bg-gray-300 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @click="emit('edit-record', history), close()"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- <AddDiagnosisModal :show="showDiagnosisModal" @close="showDiagnosisModal = false" @add-diagnosis="addDiagnosis" /> -->
  <!-- <AddTreatmentModal :show="showTreatmentModal" @close="showTreatmentModal = false" @add-treatment="addTreatment" /> -->
  <!-- <ConfirmModal :show="showConfirmModal" @close="showConfirmModal = false" /> -->
</template>
<script setup>
import { ref } from "vue";
import AddDiagnosisModal from "./AddDiagnosisModal.vue";
import AddTreatmentModal from "./AddTreatmentModal.vue";
import { deleteDiagnosisHistoryAction, deleteTreatmentHistoryAction } from "../actions/create-update-history.action";
// import ConfirmModal from "./ConfirmModal.vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  history: {
    type: Object,
    required: true,
  },
});

const history = ref({
  id: props.history.id,
  doctor: props.history.doctor || "",
  physical_exam: props.history.physical_exam || {},
  diagnosis: props.history.diagnosis || {},
  treatments: props.history.treatments || {},
  notes: props.history.notes || {},
  created: props.history.created || "",
  modified: props.history.modified || "",
  patient: props.history.patient || 0,
});

const emit = defineEmits(["close", "edit-record"]);
const close = () => {
  emit("close");
};

const showDiagnosisModal = ref(false);
const showTreatmentModal = ref(false);
</script>
