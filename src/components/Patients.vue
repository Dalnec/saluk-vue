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
      <div class="mb-6 flex gap-4 items-center">
        <div class="relative flex-1 max-w-md">
          <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          <input
            type="text"
            placeholder="Buscar paciente por nombre o ID..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model="searchModel"
          />
        </div>
        <button
          @click="showModal = true"
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <i class="fas fa-user-plus"></i>
          Crear Paciente
        </button>
      </div>

      <!-- Lista de pacientes -->
      <div
        v-for="patient in filtered"
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

const filtered = computed(() =>
  patients.value.filter((p) => p.names.toLowerCase().includes(search.value.toLowerCase()))
);

// Modal de creación
const showModal = ref(false);

const handleCreatePatient = async (newPatientData) => {
  console.log({ patient: newPatientData });

  const res = await createUpdatePatientAction(newPatientData);

  if (res.error) {
    toast.error(res.error, { autoClose: 1000 });
    return;
  }

  toast.success("Datos Guardados!", { autoClose: 1000 });

  // patients.value.push(newPatientData);
  showModal.value = false;
  emits("reload");
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
</script>
