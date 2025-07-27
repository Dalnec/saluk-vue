<template>
  <div v-if="show" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <!-- <main class="antialiased bg-gray-200 text-gray-900 font-sans overflow-x-hidden"> -->
    <div class="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
    <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
      <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
        <div class="md:flex items-center">
          <div
            class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 5.99L19.53 19H4.47zM12 2L1 21h22zm1 14h-2v2h2zm0-6h-2v4h2z" />
            </svg>
          </div>
          <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <p class="font-bold">Eliminar Registro</p>
            <p class="text-sm text-gray-700 mt-1">Esta acción es irreversible</p>
          </div>
        </div>
        <div class="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          >
            Eliminar
          </button>
          <button
            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
    <!-- </main> -->
  </div>
</template>
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>
