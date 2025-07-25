<template>
  <div>
    <PatientDetail v-if="selected" :patient="selected" @back="$emit('back')" />

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
        class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 mb-4"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-800">{{ patient.name }}</h3>
            <p class="text-gray-600">ID: {{ patient.id }} • {{ patient.age }} años • {{ patient.gender }}</p>
          </div>
          <button @click="$emit('select', patient)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Ver Historial
          </button>
        </div>
      </div>

      <!-- Nuevo Modal de Creación -->
      <CreatePatientModal
        :show="showModal"
        :patients-count="patients.length"
        @close="showModal = false"
        @create="handleCreatePatient"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, toRefs } from "vue";
import PatientDetail from "./PatientDetail.vue";
import CreatePatientModal from "./CreatePatientModal.vue";

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
  patients.value.filter(
    (p) =>
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.id.toLowerCase().includes(search.value.toLowerCase())
  )
);

// Modal de creación
const showModal = ref(false);

const handleCreatePatient = (newPatientData) => {
  patients.value.push(newPatientData);
  showModal.value = false;
};
</script>
