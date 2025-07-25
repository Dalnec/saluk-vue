<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <button @click="$emit('back')" class="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2">
      <i class="fas fa-arrow-left"></i> Volver a la lista
    </button>
    <h2 class="text-2xl font-bold mb-4">{{ patient.name }}</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div>
        <h3 class="font-semibold mb-2">Información</h3>
        <p><strong>ID:</strong> {{ patient.id }}</p>
        <p><strong>Edad:</strong> {{ patient.age }}</p>
        <p><strong>Género:</strong> {{ patient.gender }}</p>
        <p><strong>Nacimiento:</strong> {{ patient.birthDate }}</p>
      </div>
      <div>
        <h3 class="font-semibold mb-2">Contacto</h3>
        <p><strong>Teléfono:</strong> {{ patient.phone }}</p>
        <p><strong>Email:</strong> {{ patient.email }}</p>
      </div>
      <div>
        <div class="bg-red-50 rounded-lg p-3">
          <h3 class="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <i class="fas fa-exclamation-triangle text-red-500"></i> Alergias
          </h3>
          <ul class="list-disc list-inside text-red-600 text-sm space-y-1">
            <li v-for="allergy in patient.allergies" :key="allergy">{{ allergy }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Pestañas de navegación -->
    <div class="mt-6 border-b border-gray-200">
      <nav class="flex -mb-px space-x-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-3 py-2 font-medium text-sm rounded-t-lg',
            activeTab === tab.id
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Contenido de las pestañas -->
    <div class="mt-6">
      <div v-if="activeTab === 'medicalHistory'">
        <h3 class="text-lg font-semibold mb-4">Historial Médico</h3>
        <div class="space-y-4">
          <div v-for="entry in patient.medicalHistory" :key="entry.date" class="bg-gray-50 p-4 rounded-lg">
            <p class="font-semibold">{{ entry.type }} - {{ entry.date }}</p>
            <p class="text-sm text-gray-600">Doctor: {{ entry.doctor }}</p>
            <p class="mt-2">{{ entry.description }}</p>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'examenFisico'">
        <h3 class="text-lg font-semibold mb-4">Examen Físico</h3>

        <!-- Anamnesis Section -->
        <div class="mb-6">
          <h4 class="font-semibold mb-2 text-gray-800">Anamnesis</h4>
          <label for="resumenAnamnesis" class="block text-sm font-medium text-gray-700 mb-1">Resumen Anamnesis</label>
          <textarea
            id="resumenAnamnesis"
            rows="4"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- Examen Físico Section -->
        <div>
          <h4 class="font-semibold mb-2 text-gray-800">Signos Vitales</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mb-4">
            <div class="flex items-center">
              <label for="temp" class="mr-2 font-medium text-sm text-gray-700">Temp:</label>
              <input type="text" id="temp" class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div class="flex items-center">
              <label for="pa" class="mr-2 font-medium text-sm text-gray-700">PA:</label>
              <div class="flex items-center flex-1">
                <input type="text" id="pa" class="w-1/2 p-2 border border-gray-300 rounded-l-md shadow-sm" />
                <span class="px-2 bg-gray-100 border-t border-b border-gray-300">/</span>
                <input type="text" id="pa2" class="w-1/2 p-2 border border-gray-300 rounded-r-md shadow-sm" />
              </div>
            </div>
            <div class="flex items-center">
              <label for="fr" class="mr-2 font-medium text-sm text-gray-700">FR:</label>
              <input type="text" id="fr" class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div class="flex items-center">
              <label for="fc" class="mr-2 font-medium text-sm text-gray-700">FC:</label>
              <input type="text" id="fc" class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>
          <label for="resumenExamenFisico" class="block text-sm font-medium text-gray-700 mb-1"
            >Resumen Examen Físico</label
          >
          <textarea
            id="resumenExamenFisico"
            rows="4"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
      </div>
      <div v-if="activeTab === 'apoyoDiagnostico'">
        <h3 class="text-lg font-semibold mb-4">Apoyo al Diagnóstico</h3>
        <p>Contenido de apoyo al diagnóstico...</p>
      </div>
      <div v-if="activeTab === 'diagnosticoTratamiento'">
        <!-- Diagnóstico Section -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-xl font-bold text-gray-800">DIAGNÓSTICO</h4>
            <button
              @click="showDiagnosisModal = true"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Agregar
            </button>
          </div>
          <div class="overflow-x-auto">
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
                <tr v-for="(diagnosis, index) in diagnoses" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                    {{ diagnosis.ciex }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                    {{ diagnosis.description }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                    {{ diagnosis.type }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                    <button @click="deleteDiagnosis(index)" class="text-red-500 hover:text-red-700">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tratamiento Section -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-xl font-bold text-gray-800">TRATAMIENTO</h4>
            <button
              @click="showTreatmentModal = true"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Agregar
            </button>
          </div>
          <div class="overflow-x-auto">
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
                <tr v-for="(treatment, index) in treatments" :key="index">
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
                    <button @click="deleteTreatment(index)" class="text-red-500 hover:text-red-700">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'anexos'">
        <h3 class="text-lg font-semibold mb-4">Anexos</h3>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input type="file" multiple @change="handleFileUpload" class="hidden" id="file-upload" />
          <label for="file-upload" class="cursor-pointer">
            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
            <p class="text-gray-500">Arrastra y suelta archivos aquí o haz clic para seleccionar</p>
          </label>
        </div>
        <div class="mt-4">
          <h4 class="font-semibold mb-2">Archivos Adjuntos:</h4>
          <ul class="list-disc list-inside">
            <li v-for="file in attachedFiles" :key="file.name" class="text-gray-700">
              {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)
            </li>
          </ul>
        </div>
      </div>
      <div v-if="activeTab === 'notasObservaciones'">
        <h3 class="text-lg font-semibold mb-4">Notas y Observaciones</h3>
        <div class="space-y-4">
          <div>
            <label for="notas" class="block text-sm font-medium text-gray-700 mb-1">Notas</label>
            <textarea
              id="notas"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label for="observaciones" class="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
            <textarea
              id="observaciones"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <AddDiagnosisModal :show="showDiagnosisModal" @close="showDiagnosisModal = false" @add-diagnosis="addDiagnosis" />
    <AddTreatmentModal :show="showTreatmentModal" @close="showTreatmentModal = false" @add-treatment="addTreatment" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddDiagnosisModal from "./AddDiagnosisModal.vue";
import AddTreatmentModal from "./AddTreatmentModal.vue";

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
});
defineEmits(["back"]);

const activeTab = ref("diagnosticoTratamiento");

const attachedFiles = ref([]);

const handleFileUpload = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    attachedFiles.value.push(files[i]);
  }
};

const showDiagnosisModal = ref(false);
const showTreatmentModal = ref(false);

const diagnoses = ref([
  {
    ciex: "A09",
    description: "Gastroenteritis y colitis de origen infeccioso",
    type: "Presuntivo",
  },
]);

const treatments = ref([
  {
    description: "Paracetamol",
    concentration: "500mg",
    presentation: "Tableta",
  },
]);

const addDiagnosis = (diagnosis) => {
  diagnoses.value.push(diagnosis);
};

const deleteDiagnosis = (index) => {
  diagnoses.value.splice(index, 1);
};

const addTreatment = (treatment) => {
  treatments.value.push(treatment);
};

const deleteTreatment = (index) => {
  treatments.value.splice(index, 1);
};

const tabs = [
  { id: "medicalHistory", label: "Historial Médico" },
  { id: "examenFisico", label: "Examen Físico" },
  { id: "apoyoDiagnostico", label: "Apoyo al Diagnóstico" },
  { id: "diagnosticoTratamiento", label: "Diagnóstico/Tratamiento" },
  { id: "anexos", label: "Anexos" },
  { id: "notasObservaciones", label: "Notas/Observaciones" },
];
</script>
