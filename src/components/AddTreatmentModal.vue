<template>
  <div v-if="show" class="fixed w-full h-full top-0 left-0 flex items-center justify-center" @click.self="close">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div class="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Agregar Tratamiento</h3>
        <div class="mt-2 px-7 py-3">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="description" class="block text-sm font-medium text-gray-700 text-left">Descripción</label>
              <textarea
                type="text"
                id="description"
                v-model="form.description"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                autocomplete="off"
                required
              />
            </div>
            <div class="mb-4">
              <label for="concentration" class="block text-sm font-medium text-gray-700 text-left">Concentración</label>
              <input
                type="text"
                id="concentration"
                v-model="form.concentration"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                autocomplete="off"
              />
            </div>
            <div class="mb-4">
              <label for="presentation" class="block text-sm font-medium text-gray-700 text-left">Presentación</label>
              <input
                type="text"
                id="presentation"
                v-model="form.presentation"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                autocomplete="off"
              />
            </div>
            <div class="mt-8 flex justify-end gap-4">
              <button
                @click="close"
                class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Agregar
              </button>
            </div>
          </form>
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

const emit = defineEmits(["close", "add-treatment"]);

const form = ref({
  description: "",
  concentration: "",
  presentation: "",
});

const close = () => {
  emit("close");
};

const submitForm = () => {
  emit("add-treatment", { ...form.value });
  form.value = { description: "", concentration: "", presentation: "" }; // Reset form
  close();
};
</script>
