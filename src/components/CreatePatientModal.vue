<template>
  <div v-if="show" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <!-- hoverlay  -->
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div
      class="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-[90vh]"
    >
      <!-- Add modal content here -->
      <div class="modal-content py-4 text-left px-6">
        <div class="flex justify-between items-center pb-3">
          <div class="text-2xl font-bold border-b w-full">
            {{ newPatient.id ? "Editar Paciente" : "Nuevo Paciente" }}
          </div>
          <div class="modal-close cursor-pointer z-50 text-gray-500 hover:text-gray-800 text-2xl">
            <svg
              class="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              @click="$emit('close')"
            >
              <path d="M1.39 1.393l15.318 15.314m-15.318 0L16.706 1.393" />
            </svg>
          </div>
        </div>
        <form @submit.prevent="createPatient" autocomplete="off">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2">
            <!-- Columna Izquierda -->
            <div class="md:col-span-2 f">
              <label class="font-semibold text-gray-600 block mb-2">DNI</label>
              <div class="flex items-center">
                <input
                  v-model="newPatient.ci"
                  type="text"
                  inputmode="numeric"
                  placeholder="Ej: 88888888"
                  class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  autocomplete="off"
                />
                <button
                  @click="searchPatient(newPatient.ci)"
                  type="button"
                  class="bg-gray-500 hover:bg-gray-700 text-white py-2 px-6 ml-2 rounded text-md"
                  :disabled="!newPatient.id && String(newPatient.id).length < 8"
                >
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="mr-2">
                      <path
                        fill="currentColor"
                        d="M11 12q-1.65 0-2.825-1.175T7 8t1.175-2.825T11 4t2.825 1.175T15 8t-1.175 2.825T11 12m11.1 11.5l-3.2-3.2q-.525.3-1.125.5T16.5 21q-1.875 0-3.187-1.312T12 16.5t1.313-3.187T16.5 12t3.188 1.313T21 16.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2zM16.5 19q1.05 0 1.775-.725T19 16.5t-.725-1.775T16.5 14t-1.775.725T14 16.5t.725 1.775T16.5 19m-5.475-6q-1.05 1.55-1.05 3.5t1.05 3.5H3v-2.775q0-.85.425-1.575t1.175-1.1q1.275-.65 2.875-1.1t3.55-.45"
                      />
                    </svg>
                    Buscar
                  </div>
                </button>
              </div>
            </div>
            <div>
              <label class="font-semibold text-gray-600 block mb-2">Nombres</label>
              <input
                v-model="newPatient.names"
                type="text"
                placeholder="Ej: Juan Pérez"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                autocomplete="off"
                required
              />
            </div>
            <div>
              <label class="font-semibold text-gray-600 block mb-2">Apellidos</label>
              <input
                v-model="newPatient.lastnames"
                type="text"
                placeholder="Ej: Perez Gómez"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                autocomplete="off"
                required
              />
            </div>
            <div>
              <label class="font-semibold text-gray-600 block mb-2">Género</label>
              <select
                v-model="newPatient.gender"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                autocomplete="off"
                required
              >
                <option disabled value="">Seleccione género</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <div>
              <label class="font-semibold text-gray-600 block mb-2">Número de Teléfono</label>
              <input
                v-model="newPatient.phone"
                type="tel"
                placeholder="Ej: 987654321"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                autocomplete="off"
              />
            </div>
            <!-- <div>
              <label class="font-semibold text-gray-600 block mb-2">Correo Electrónico</label>
              <input
                v-model="newPatient.email"
                type="email"
                placeholder="Ej: juan.perez@example.com"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                autocomplete="off"
              />
            </div> -->
            <div>
              <label class="font-semibold text-gray-600 block mb-2">Fecha de Nacimiento</label>
              <input
                v-model="newPatient.birthdate"
                type="date"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
                autocomplete="off"
              />
            </div>
            <!-- <div>
              <label class="font-semibold text-gray-600 block mb-2">Tipo de Sangre</label>
              <input
                v-model="newPatient.bloodType"
                type="text"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Ej: O+"
                autocomplete="off"
              />
            </div> -->

            <!-- Columna Derecha -->
            <!-- <div class="md:col-span-2">
              <label class="font-semibold text-gray-600 block mb-2">Motivo de Consulta Inicial</label>
              <textarea
                v-model="newPatient.notes"
                placeholder="Describa brevemente el motivo de la visita..."
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                rows="4"
              ></textarea>
            </div> -->
            <div class="md:col-span-1">
              <label class="font-semibold text-gray-600 block mb-2">Alergias Conocidas</label>
              <input
                v-model="newPatient.allergies"
                type="text"
                placeholder="Ej: Penicilina, Polen"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                autocomplete="off"
              />
            </div>
            <div class="md:col-span-2">
              <label class="font-semibold text-gray-600 block mb-2">Dirección</label>
              <input
                v-model="newPatient.address"
                type="text"
                placeholder="Ej: juan.perez@example.com"
                class="flex-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                autocomplete="off"
              />
            </div>
            <div class="md:col-span-2">
              <h3 class="text-lg font-semibold text-gray-700 mb-2">Contactos de Referencia</h3>
              <div
                v-for="(contact, index) in newPatient.contacts"
                :key="index"
                class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4"
              >
                <div class="md:col-span-4">
                  <div class="flex justify-between">
                    <label class="font-semibold text-gray-600 block mb-1">Nombre</label>
                    <button
                      @click="newPatient.contacts.splice(index, 1)"
                      class="text-red-500 hover:underline text-sm"
                      v-if="newPatient.contacts.length > 0"
                    >
                      Eliminar contacto
                    </button>
                  </div>
                  <input
                    v-model="contact.name"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Ej: María López"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="font-semibold text-gray-600 block mb-1">Teléfono</label>
                  <input
                    v-model="contact.phone"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Ej: 76543210"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="font-semibold text-gray-600 block mb-1">Parentesco</label>
                  <input
                    v-model="contact.relationship"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Ej: Madre"
                  />
                </div>
              </div>

              <button
                type="button"
                @click="
                  () => {
                    if (newPatient.contacts) {
                      newPatient.contacts.push({ name: '', phone: '', relationship: '' });
                    } else {
                      newPatient.contacts = [{ name: '', phone: '', relationship: '' }];
                    }
                  }
                "
                class="mt-2 text-blue-600 hover:underline text-sm"
              >
                + Agregar contacto
              </button>
            </div>
          </div>
          <div class="mt-8 flex justify-between">
            <button
              type="button"
              @click="
                () => {
                  if (!newPatient.id) newPatient = { ...defaultNewPatient };
                  $emit('close');
                }
              "
              class="px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button type="submit" class="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">
              <i class="fas fa-save mr-2"></i>
              Guardar Paciente
            </button>
          </div>
          <!-- <pre>
            {{ newPatient }}
          </pre> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { searchPatientAction } from "../actions/get-patient.action";
import { toast } from "vue3-toastify";

const props = defineProps({
  show: Boolean,
  patient: {
    type: Object,
    required: false,
  },
});
const emits = defineEmits(["close", "create"]);

onMounted(() => {
  if (props.patient) {
    newPatient.value = {
      ...props.patient,
      allergies: props.patient.allergies.length > 0 ? JSON.parse(props.patient.allergies).join(", ") : "",
    };
  }
});

const newPatient = ref({
  ci: "",
  names: "",
  lastnames: "",
  gender: "",
  phone: "",
  email: "",
  birthdate: "",
  allergies: "",
  address: "",
  contacts: [],
});

const defaultNewPatient = ref({ ...newPatient.value });
const createPatient = () => {
  const newEntry = {
    ...newPatient.value,
    allergies: JSON.stringify(newPatient.value.allergies.split(", ").filter((allergy) => allergy.length > 0)),
    // auditorylog: [
    //   {
    //     date: new Date().toISOString().split("T")[0],
    //     type: "Consulta de Ingreso",
    //     doctor: "Dr. Alan Grant",
    //     description: newPatient.value.notes || "Registro inicial de paciente.",
    //   },
    // ],
  };

  emits("create", newEntry);
  if (!newEntry.id) {
    newPatient.value = { ...defaultNewPatient.value };
  }
};

const searchPatient = async (document) => {
  const { data, status } = await searchPatientAction(document);

  if (status === 200 && data.success) {
    newPatient.value.names = data.data.nombres;
    newPatient.value.lastnames = `${data.data.apellido_paterno} ${data.data.apellido_materno}`;
    return;
  }
  toast.error(data.message || "Paciente no encontrado", { autoClose: 4000 });
};
</script>
