<template>
  <div>
    <PatientDetail
      v-if="selected"
      :patient="selected"
      @back="$emit('back')"
      @save-record="handleSaveRecord"
      @save-patient="handleCreatePatient"
    />

    <div v-else>
      <!-- Búsqueda y creación -->
      <div class="mb-4 flex gap-4 items-center justify-between">
        <div class="flex items-center">
          <div class="relative flex-1">
            <!-- Ícono -->
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11 12q-1.65 0-2.825-1.175T7 8t1.175-2.825T11 4t2.825 1.175T15 8t-1.175 2.825T11 12m11.1 11.5l-3.2-3.2q-.525.3-1.125.5T16.5 21q-1.875 0-3.187-1.312T12 16.5t1.313-3.187T16.5 12t3.188 1.313T21 16.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2zM16.5 19q1.05 0 1.775-.725T19 16.5t-.725-1.775T16.5 14t-1.775.725T14 16.5t.725 1.775T16.5 19m-5.475-6q-1.05 1.55-1.05 3.5t1.05 3.5H3v-2.775q0-.85.425-1.575t1.175-1.1q1.275-.65 2.875-1.1t3.55-.45"
                />
              </svg>
            </div>

            <!-- Input -->
            <input
              id="search"
              type="text"
              placeholder="Buscar paciente..."
              class="w-19/20 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              v-model="searchModel"
            />
          </div>
          <button
            @click="showModal = true"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
              <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
            </svg>
            Crear Paciente
          </button>
        </div>
        <button
          @click="reportPatients()"
          class="bg-none px-4 py-2 rounded-lg hover:outline-1 hover:outline-green-500 hover:text-green-500 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M23 1.5q.41 0 .7.3q.3.29.3.7v19q0 .41-.3.7q-.29.3-.7.3H7q-.41 0-.7-.3q-.3-.29-.3-.7V18H1q-.41 0-.7-.3q-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7q.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87l2.34-3.8H7.46l-1.3 2.4l-.05.08l-.04.09l-.64-1.28l-.66-1.29H2.59l2.27 3.82l-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z"
            />
          </svg>
          Descargar Lista Pacientes
        </button>
        <button
          @click="reportRecords()"
          class="bg-none px-4 py-2 rounded-lg hover:outline-1 hover:outline-green-500 hover:text-green-500 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M23 1.5q.41 0 .7.3q.3.29.3.7v19q0 .41-.3.7q-.29.3-.7.3H7q-.41 0-.7-.3q-.3-.29-.3-.7V18H1q-.41 0-.7-.3q-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7q.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87l2.34-3.8H7.46l-1.3 2.4l-.05.08l-.04.09l-.64-1.28l-.66-1.29H2.59l2.27 3.82l-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z"
            />
          </svg>
          Descargar Consultas
        </button>
      </div>

      <!-- Lista de pacientes -->
      <div
        v-for="patient in patients"
        :key="patient.id"
        class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 mb-3"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-semibold text-gray-800">{{ patient.full_name }}</h3>
            <p class="text-gray-600">
              COD: {{ patient.code }} • {{ patient.age || 0 }} años • {{ patient.gender_description }}
            </p>
          </div>
          <button @click="$emit('select', patient)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Ver Historial
          </button>
        </div>
      </div>

      <!-- Nuevo Modal de Creación -->
      <CreatePatientModal :show="showModal" @close="showModal = false" @create="handleCreatePatient" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, toRefs } from "vue";
import PatientDetail from "./PatientDetail.vue";
import CreatePatientModal from "./CreatePatientModal.vue";
import { createUpdatePatientAction } from "../actions/create-update-patient.action";
import { toast } from "vue3-toastify";
import { createUpdateHistoryAction } from "../actions/create-update-history.action";
import { reportPatientAction } from "../actions/get-patient.action";
import { reportRecordsAction } from "../actions/get-history.action";

const props = defineProps({
  patients: Array,
  selected: Object,
  search: String,
});
const emits = defineEmits(["select", "back", "update:search"]);

const { patients, search } = toRefs(props);
const searchModel = computed({
  get: () => search.value,
  set: (val) => emits("update:search", val),
});

// const filtered = computed(() =>
//   patients.value.filter((p) => p.names.toLowerCase().includes(search.value.toLowerCase()))
// );

// Modal de creación
const showModal = ref(false);

const handleCreatePatient = async (newPatientData) => {
  console.log({ patient: newPatientData });

  const { data, status } = await createUpdatePatientAction(newPatientData);

  if (data.success === false) {
    toast.error(data.message || "Error al crear paciente", { autoClose: 1000 });
    return;
  }
  if (data.error) {
    toast.error(data.error, { autoClose: 1000 });
    return;
  }

  toast.success("Datos Guardados!", { autoClose: 1000 });

  // patients.value.push(newPatientData);
  showModal.value = false;
  // Recarga la lista de pacientes
  emits("reload");
  // Redirecciona al registro del nuevo hitorial
  emits("select", data);
};

const handleSaveRecord = async (newRecord) => {
  const res = await createUpdateHistoryAction(newRecord);
  if (res.error) {
    toast.error(res.error, { autoClose: 1000 });
    return;
  }
  toast.success("Historial Actualizado!", { autoClose: 1000 });
  // const patient = patients.value.find((p) => p.id === props.selected.id);
  // if (patient) {
  //   if (!patient.medicalHistory) {
  //     patient.medicalHistory = [];
  //   }
  //   patient.medicalHistory.unshift(res.data);
  // }
};
const reportPatients = async () => {
  try {
    const response = await reportPatientAction();
    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    // Usa el nombre de archivo del header si existe, o define uno fijo
    const contentDisposition = response.headers["content-disposition"];
    let fileName = "reporte_pacientes.xlsx";

    if (contentDisposition && contentDisposition.includes("filename=")) {
      fileName = contentDisposition.split("filename=")[1].replace(/["']/g, "");
    }

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al descargar el reporte:", error);
  }
};

const reportRecords = async () => {
  try {
    const response = await reportRecordsAction();
    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    // Usa el nombre de archivo del header si existe, o define uno fijo
    const contentDisposition = response.headers["content-disposition"];
    let fileName = "reporte_consultas.xlsx";

    if (contentDisposition && contentDisposition.includes("filename=")) {
      fileName = contentDisposition.split("filename=")[1].replace(/["']/g, "");
    }

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al descargar el reporte:", error);
  }
};
</script>
