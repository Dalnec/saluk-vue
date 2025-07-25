<template>
  <div v-if="show" class="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl transform transition-all duration-300 ease-out">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Registrar Nuevo Paciente</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800 text-2xl">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
      <form @submit.prevent="createPatient">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <!-- Columna Izquierda -->
          <div>
            <label class="font-semibold text-gray-600 block mb-2">Nombre Completo</label>
            <input v-model="newPatient.name" type="text" placeholder="Ej: Juan Pérez" class="form-input" required />
          </div>
          <div>
            <label class="font-semibold text-gray-600 block mb-2">Edad</label>
            <input v-model="newPatient.age" type="number" placeholder="Ej: 34" class="form-input" required />
          </div>
          <div>
            <label class="font-semibold text-gray-600 block mb-2">Género</label>
            <select v-model="newPatient.gender" class="form-input" required>
              <option disabled value="">Seleccione género</option>
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-gray-600 block mb-2">Número de Teléfono</label>
            <input v-model="newPatient.phone" type="tel" placeholder="Ej: 71234567" class="form-input" required />
          </div>
          <div>
            <label class="font-semibold text-gray-600 block mb-2">Correo Electrónico</label>
            <input
              v-model="newPatient.email"
              type="email"
              placeholder="Ej: juan.perez@example.com"
              class="form-input"
              required
            />
          </div>
          <div>
            <label class="font-semibold text-gray-600 block mb-2">Fecha de Nacimiento</label>
            <input v-model="newPatient.birthDate" type="date" class="form-input" required />
          </div>

          <!-- Columna Derecha -->
          <div class="md:col-span-2">
            <label class="font-semibold text-gray-600 block mb-2">Motivo de Consulta Inicial</label>
            <textarea
              v-model="newPatient.notes"
              placeholder="Describa brevemente el motivo de la visita..."
              class="form-textarea"
              rows="4"
            ></textarea>
          </div>
          <div class="md:col-span-2">
            <label class="font-semibold text-gray-600 block mb-2">Alergias Conocidas</label>
            <input v-model="newPatient.allergies" type="text" placeholder="Ej: Penicilina, Polen" class="form-input" />
          </div>
        </div>
        <div class="mt-8 flex justify-end gap-4">
          <button type="button" @click="$emit('close')" class="btn-secondary">Cancelar</button>
          <button type="submit" class="btn-primary">
            <i class="fas fa-save mr-2"></i>
            Guardar Paciente
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  show: Boolean,
  patientsCount: Number,
});
const emits = defineEmits(["close", "create"]);

const newPatient = ref({
  name: "",
  age: "",
  gender: "",
  phone: "",
  email: "",
  birthDate: "",
  notes: "",
  allergies: "",
});

const createPatient = () => {
  const id = `P${(props.patientsCount + 1).toString().padStart(3, "0")}`;
  const newEntry = {
    id,
    name: newPatient.value.name,
    age: newPatient.value.age,
    gender: newPatient.value.gender,
    phone: newPatient.value.phone,
    email: newPatient.value.email,
    birthDate: newPatient.value.birthDate,
    allergies: newPatient.value.allergies ? newPatient.value.allergies.split(",").map((s) => s.trim()) : [],
    medicalHistory: [
      {
        date: new Date().toISOString().split("T")[0],
        type: "Consulta de Ingreso",
        doctor: "Dr. Alan Grant",
        description: newPatient.value.notes || "Registro inicial de paciente.",
      },
    ],
  };
  emits("create", newEntry);
  // Reset form can be done in the parent component after successful creation
};
</script>
