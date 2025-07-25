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

      <!-- Modal de creación -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-800">Nuevo Paciente</h2>
            <button @click="showModal = false" class="text-gray-500 hover:text-gray-800">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form @submit.prevent="createPatient">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                v-model="newPatient.name"
                type="text"
                placeholder="Nombre completo"
                class="border p-2 rounded w-full"
                required
              />
              <input
                v-model="newPatient.age"
                type="number"
                placeholder="Edad"
                class="border p-2 rounded w-full"
                required
              />
              <input
                v-model="newPatient.gender"
                type="text"
                placeholder="Género"
                class="border p-2 rounded w-full"
                required
              />
              <input
                v-model="newPatient.phone"
                type="text"
                placeholder="Teléfono"
                class="border p-2 rounded w-full"
                required
              />
              <input
                v-model="newPatient.email"
                type="email"
                placeholder="Email"
                class="border p-2 rounded w-full"
                required
              />
            </div>
            <div class="mt-4">
              <textarea
                v-model="newPatient.notes"
                placeholder="Notas o motivo de consulta"
                class="w-full border p-2 rounded"
              ></textarea>
            </div>
            <div class="mt-4 text-right">
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, toRefs } from "vue";
import PatientDetail from "./PatientDetail.vue";

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
const newPatient = ref({
  name: "",
  age: "",
  gender: "",
  phone: "",
  email: "",
  notes: "",
});

const createPatient = () => {
  const id = `P${(patients.value.length + 1).toString().padStart(3, "0")}`;
  const newEntry = {
    id,
    name: newPatient.value.name,
    age: newPatient.value.age,
    gender: newPatient.value.gender,
    phone: newPatient.value.phone,
    email: newPatient.value.email,
    allergies: [],
    medicalHistory: [
      {
        date: new Date().toISOString().split("T")[0],
        type: "Consulta",
        doctor: "Dr. María González",
        description: newPatient.value.notes || "Primera consulta",
      },
    ],
  };
  patients.value.push(newEntry);
  Object.assign(newPatient.value, { name: "", age: "", gender: "", phone: "", email: "", notes: "" });
  showModal.value = false;
};
</script>
