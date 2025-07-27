<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center">
      <button @click="$emit('back')" class="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20">
          <path fill="currentColor" d="m5.83 9l5.58-5.58L10 2l-8 8l8 8l1.41-1.41L5.83 11H18V9z" />
        </svg>
        Volver a la lista
      </button>
    </div>
    <div class="flex items-center mb-4">
      <div class="text-2xl font-bold">
        {{ patient.full_name }}
      </div>
      <button
        @click="showCreatePatientModal = true"
        class="px-2 p-1 rounded-lg flex items-center gap-2 text-amber-500 hover:text-amber-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
          />
        </svg>
      </button>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <div>
        <h3 class="font-semibold mb-2">Información:</h3>
        <p><strong>Código:</strong> {{ patient.code }}</p>
        <p><strong>Edad:</strong> {{ patient.age }}</p>
        <p><strong>Género:</strong> {{ patient.gender_description }}</p>
        <p><strong>Nacimiento:</strong> {{ patient.birthdate }}</p>
      </div>
      <div>
        <h3 class="font-semibold mb-2">Contacto:</h3>
        <p><strong>Teléfono:</strong> {{ patient.phone }}</p>
        <p><strong>Email:</strong> {{ patient.email }}</p>
      </div>
      <div>
        <div class="bg-red-50 rounded-lg p-3">
          <h3 class="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <i class="fas fa-exclamation-triangle text-red-500"></i> Alergias
          </h3>
          <ul class="list-disc list-inside text-red-600 text-sm space-y-1">
            <li v-for="allergy in JSON.parse(patient.allergies)" :key="allergy">{{ allergy }}</li>
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
        <div v-if="medicalHistory.length === 0" class="flex items-center justify-center m-2">
          <h3 class="text-lg font-semibold m-2 text-gray-400">No hay historial Médico</h3>
        </div>
        <div class="space-y-4">
          <MedicalSummaryCard
            v-if="medicalHistory.length > 0"
            v-for="(summary, index) in medicalHistory"
            :key="index"
            :summary="summary"
            @edit-record="editMedicalRecord($event)"
          />
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
            v-model="newHistory.physical_exam.summaryAnamnesis"
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
                v-model="newHistory.physical_exam.temperature"
              />
            </div>
            <div class="flex items-center">
              <label for="pa" class="mr-2 font-medium text-sm text-gray-700">PA:</label>
              <div class="flex items-center flex-1">
                <input
                  type="text"
                  id="pa"
                  class="w-1/2 p-2 border border-gray-300 rounded-l-md shadow-sm"
                  v-model="newHistory.physical_exam.bloodPressureSystolic"
                />
                <span class="px-2 bg-gray-100 border-t border-b border-gray-300">/</span>
                <input
                  type="text"
                  id="pa2"
                  class="w-1/2 p-2 border border-gray-300 rounded-r-md shadow-sm"
                  v-model="newHistory.physical_exam.bloodPressureDiastolic"
                />
              </div>
            </div>
            <div class="flex items-center">
              <label for="fr" class="mr-2 font-medium text-sm text-gray-700">FR:</label>
              <input
                type="text"
                id="fr"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                v-model="newHistory.physical_exam.respiratoryRate"
              />
            </div>
            <div class="flex items-center">
              <label for="fc" class="mr-2 font-medium text-sm text-gray-700">FC:</label>
              <input
                type="text"
                id="fc"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                v-model="newHistory.physical_exam.heartRate"
              />
            </div>
          </div>
          <label for="resumenExamenFisico" class="block text-sm font-medium text-gray-700 mb-1"
            >Resumen Examen Físico</label
          >
          <textarea
            id="resumenExamenFisico"
            rows="4"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            v-model="newHistory.physical_exam.summaryPhysicalExam"
          ></textarea>
        </div>
      </div>

      <div v-if="activeTab === 'apoyoDiagnostico'">
        <h3 class="text-lg font-semibold mb-2">Apoyo al Diagnóstico</h3>
        <p>Contenido de apoyo al diagnóstico...</p>
      </div>

      <div v-if="activeTab === 'diagnosticoTratamiento'">
        <!-- Diagnóstico Section -->
        <div class="mb-2">
          <div class="flex justify-between items-center mb-2">
            <h4 class="text-lg font-bold text-gray-800">Diagnóstico</h4>
            <button
              @click="showDiagnosisModal = true"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded"
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
                <tr v-for="(diagnosis, index) in newHistory.diagnosis" :key="index">
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
                    <button @click="deleteDiagnosis(index)" class="text-red-500 hover:text-red-700">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tratamiento Section -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <h4 class="text-lg font-bold text-gray-800">Tratamiento</h4>
            <button
              @click="showTreatmentModal = true"
              class="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded"
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
                <tr v-for="(treatment, index) in newHistory.treatments" :key="index">
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
            <li v-for="file in newHistory.attachments" :key="file.name" class="text-gray-700">
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
              v-model="newHistory.notes.notes"
            ></textarea>
          </div>
          <div>
            <label for="observaciones" class="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
            <textarea
              id="observaciones"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              v-model="newHistory.notes.observations"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 flex justify-end">
      <button
        @click="saveMedicalRecord(newHistory)"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Guardar Registro
      </button>
    </div>
    <AddDiagnosisModal :show="showDiagnosisModal" @close="showDiagnosisModal = false" @add-diagnosis="addDiagnosis" />
    <AddTreatmentModal :show="showTreatmentModal" @close="showTreatmentModal = false" @add-treatment="addTreatment" />
    <CreatePatientModal
      :show="showCreatePatientModal"
      @close="showCreatePatientModal = false"
      :patient="patient"
      @create="handleCreatePatient"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AddDiagnosisModal from "./AddDiagnosisModal.vue";
import AddTreatmentModal from "./AddTreatmentModal.vue";
import MedicalSummaryCard from "./MedicalSummaryCard.vue";
import { getAllHistoryAction } from "../actions/get-history.action";
import { toast } from "vue3-toastify";
import CreatePatientModal from "./CreatePatientModal.vue";

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
});
const patient = ref({ ...props.patient });

const emit = defineEmits(["back", "save-record", "save-patient"]);

const activeTab = ref("medicalHistory");
const attachedFiles = ref([]);
const medicalHistory = ref([]);

onMounted(() => {
  getMedicalHistoryByPatient();
});

const getMedicalHistoryByPatient = async () => {
  const res = await getAllHistoryAction({ patient: props.patient.id });
  console.log(res);
  medicalHistory.value = res;
};

const handleCreatePatient = async (newPatientData) => {
  console.log({ patient: newPatientData });
  patient.value = {
    ...newPatientData,
    full_name: newPatientData.names.toUpperCase() + " " + newPatientData.lastnames.toUpperCase(),
  };
  showCreatePatientModal.value = false;
  emit("save-patient", newPatientData);
};

const handleFileUpload = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    attachedFiles.value.push(files[i]);
  }
};

const showDiagnosisModal = ref(false);
const showTreatmentModal = ref(false);
const showCreatePatientModal = ref(false);

const newHistory = ref({
  physical_exam: {
    weight: "",
    height: "",
    summaryAnamnesis: "",
    summaryPhysicalExam: "",
    temperature: "",
    bloodPressureSystolic: 0,
    bloodPressureDiastolic: 0,
    heartRate: 0,
    respiratoryRate: 0,
    oxygenSaturation: "",
  },
  // diagnostic_support: {
  //   studyType: "",
  //   result: "",
  //   file: "",
  // },
  diagnosis: [],
  treatments: [],
  // attachments: [],
  notes: {
    notes: "",
    observations: "",
  },
  title: "",
  summary: "",
  patient: props.patient.id,
});
const defaultnewHistory = ref({ ...newHistory.value });

const addDiagnosis = (diagnosis) => {
  newHistory.value.diagnosis.push(diagnosis);
};

const deleteDiagnosis = (index) => {
  newHistory.value.diagnosis.splice(index, 1);
};

const addTreatment = (treatment) => {
  newHistory.value.treatments.push(treatment);
};

const deleteTreatment = (index) => {
  newHistory.value.treatments.splice(index, 1);
};

function normalizeEmptyFields(history) {
  const fieldsToCheck = ["physical_exam", "diagnosis", "treatments", "notes"];

  fieldsToCheck.forEach((field) => {
    const value = history[field];

    if (Array.isArray(value) && value.length === 0) {
      // arreglos vacíos → null
      delete history[field];
    } else if (typeof value === "object" && value !== null) {
      // objetos vacíos (todos sus campos vacíos o 0) → null
      const allEmpty = Object.values(value).every((v) => v === "" || v === null || v === 0);
      if (allEmpty) {
        delete history[field];
      }
    }
  });
  return history;
}

const saveMedicalRecord = async (history) => {
  const payload = normalizeEmptyFields({ ...history });
  console.log(payload);

  if (!payload.diagnosis && !payload.treatments && !payload.notes && !payload.physical_exam) {
    toast.error("Ingresar Datos", { autoClose: 2000 });
    return;
  }

  emit("save-record", payload);

  // Reset form fields
  newHistory.value = { ...defaultnewHistory.value };
  attachedFiles.value = [];
  activeTab.value = "medicalHistory";
  setTimeout(() => {}, 3000);
  await getMedicalHistoryByPatient();
};

const editMedicalRecord = async (history) => {
  const payload = normalizeEmptyFields({ ...history });
  console.log(payload);
  if (!payload.diagnosis && !payload.treatments && !payload.notes && !payload.physical_exam) {
    toast.error("Ingresar Datos", { autoClose: 2000 });
    return;
  }
  emit("save-record", payload);
  setTimeout(() => {}, 3000);
  newHistory.value = { ...defaultnewHistory.value };
  await getMedicalHistoryByPatient();
};

const tabs = [
  { id: "medicalHistory", label: "Historial Médico" },
  { id: "examenFisico", label: "Exámen Físico" },
  // { id: "apoyoDiagnostico", label: "Apoyo al Diagnóstico" },
  { id: "diagnosticoTratamiento", label: "Diagnóstico/Tratamiento" },
  { id: "anexos", label: "Anexos" },
  { id: "notasObservaciones", label: "Notas/Observaciones" },
];
</script>
