<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    @click.self="close"
  >
    <div class="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Agregar Diagnóstico</h3>
        <div class="mt-2 px-7 py-3">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="ciex" class="block text-sm font-medium text-gray-700 text-left">CIEX</label>
              <input
                type="text"
                id="ciex"
                v-model="form.ciex"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div class="mb-4">
              <label for="description" class="block text-sm font-medium text-gray-700 text-left">Descripción</label>
              <input
                type="text"
                id="description"
                v-model="form.description"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div class="mb-4">
              <label for="type" class="block text-sm font-medium text-gray-700 text-left">Tipo de diagnóstico</label>
              <input
                type="text"
                id="type"
                v-model="form.type"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div class="items-center px-4 py-3">
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
        <div class="items-center px-4 py-3">
          <button
            @click="close"
            class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "add-diagnosis"]);

const form = ref({
  ciex: "",
  description: "",
  type: "",
});

const close = () => {
  emit("close");
};

const submitForm = () => {
  emit("add-diagnosis", { ...form.value });
  form.value = { ciex: "", description: "", type: "" }; // Reset form
  close();
};
</script>
