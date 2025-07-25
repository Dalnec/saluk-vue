<!-- <template>
  <div class="bg-white rounded-2xl shadow p-6 mb-6 space-y-4 border border-gray-100">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-blue-700">Consulta - {{ date }}</h2>
      <span class="text-sm text-gray-500">Dr. {{ doctor }}</span>
    </div>

    <div v-if="summary.anamnesis" class="space-y-1">
      <h3 class="text-md font-medium text-gray-700">🩺 Anamnesis</h3>
      <p class="text-gray-600 text-sm">{{ summary.anamnesis }}</p>
    </div>

    <div v-if="summary.vitals" class="space-y-1">
      <h3 class="text-md font-medium text-gray-700">❤️ Signos Vitales</h3>
      <p class="text-gray-600 text-sm">
        Temp: {{ summary.vitals.temp }} °C | PA: {{ summary.vitals.pa_systolic }}/{{ summary.vitals.pa_diastolic }} mmHg
        | FR: {{ summary.vitals.fr }} rpm | FC: {{ summary.vitals.fc }} lpm
      </p>
    </div>

    <div v-if="summary.physicalExam" class="space-y-1">
      <h3 class="text-md font-medium text-gray-700">🧑‍⚕️ Examen Físico</h3>
      <p class="text-gray-600 text-sm">{{ summary.physicalExam }}</p>
    </div>

    <div v-if="summary.diagnosis?.length" class="space-y-1">
      <h3 class="text-md font-medium text-gray-700">🧾 Diagnóstico</h3>
      <ul class="list-disc pl-5 text-gray-600 text-sm">
        <li v-for="(diag, index) in summary.diagnosis" :key="index">
          {{ diag.code }} - {{ diag.description }} ({{ diag.type }})
        </li>
      </ul>
    </div>

    <div v-if="summary.treatment?.length" class="space-y-1">
      <h3 class="text-md font-medium text-gray-700">💊 Tratamiento</h3>
      <ul class="list-disc pl-5 text-gray-600 text-sm">
        <li v-for="(med, index) in summary.treatment" :key="index">{{ med.name }} - {{ med.dose }} - {{ med.form }}</li>
      </ul>
    </div>

    <div v-if="summary.notes || summary.observations" class="space-y-1">
      <h3 class="text-md font-medium text-gray-700">📝 Notas y Observaciones</h3>
      <p v-if="summary.notes" class="text-gray-600 text-sm"><strong>Notas:</strong> {{ summary.notes }}</p>
      <p v-if="summary.observations" class="text-gray-600 text-sm">
        <strong>Observaciones:</strong> {{ summary.observations }}
      </p>
    </div>

    <div v-if="summary.attachments?.length" class="space-y-1">
      <h3 class="text-md font-medium text-gray-700">📎 Anexos</h3>
      <ul class="list-disc pl-5 text-sm text-blue-600 underline">
        <li v-for="(file, index) in summary.attachments" :key="index">
          <a :href="file.url" target="_blank">{{ file.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  doctor: String,
  date: String,
  summary: {
    type: Object,
    required: true,
    default: () => ({
      anamnesis: "",
      vitals: {
        temp: "",
        pa_systolic: "",
        pa_diastolic: "",
        fr: "",
        fc: "",
      },
      physicalExam: "",
      diagnosis: [],
      treatment: [],
      attachments: [],
      notes: "",
      observations: "",
    }),
  },
});
</script> -->
<template>
  <div class="bg-white rounded-2xl shadow px-4 py-2 mb-2 border border-gray-100 space-y-2">
    <!-- Header -->
    <div class="flex justify-between items-center border-b">
      <h2 class="text-md font-semibold text-blue-700">Consulta - {{ date }}</h2>
      <span class="text-sm text-gray-500">Dr. {{ doctor }}</span>
    </div>

    <div class="grid md:grid-cols-10 gap-2">
      <!-- Grupo 1: Anamnesis, Signos Vitales, Examen Físico -->
      <div class="col-span-1 md:col-span-4 bg-gray-50 rounded-xl p-2 space-y-1">
        <div>
          <h3 class="text-md font-semibold text-gray-700">🩺 Anamnesis</h3>
          <p class="text-sm text-gray-600">{{ summary.anamnesis || "Sin información." }}</p>
        </div>
        <div>
          <h3 class="text-md font-semibold text-gray-700">❤️ Signos Vitales</h3>
          <p class="text-sm text-gray-600">
            Temp: {{ summary.vitals.temp }} °C | PA: {{ summary.vitals.pa_systolic }}/{{
              summary.vitals.pa_diastolic
            }}
            mmHg | FR: {{ summary.vitals.fr }} rpm | FC: {{ summary.vitals.fc }} lpm
          </p>
        </div>
        <div>
          <h3 class="text-md font-semibold text-gray-700">🧑‍⚕️ Examen Físico</h3>
          <p class="text-sm text-gray-600">{{ summary.physicalExam || "Sin información." }}</p>
        </div>
      </div>
      <div class="col-span-1 md:col-span-3 bg-gray-50 rounded-xl p-2 space-y-1">
        <!-- Grupo 2: Diagnóstico y Tratamiento -->
        <div>
          <h3 class="text-md font-semibold text-gray-700">🧾 Diagnóstico</h3>
          <ul v-if="summary.diagnosis.length" class="list-disc pl-5 text-sm text-gray-600">
            <li v-for="(diag, index) in summary.diagnosis" :key="'dx-' + index">
              {{ diag.code }} - {{ diag.description }} ({{ diag.type }})
            </li>
          </ul>
          <p v-else class="text-sm text-gray-500">Sin diagnósticos registrados.</p>
        </div>
        <div>
          <h3 class="text-md font-semibold text-gray-700">💊 Tratamiento</h3>
          <ul v-if="summary.treatment.length" class="list-disc pl-5 text-sm text-gray-600">
            <li v-for="(med, index) in summary.treatment" :key="'tx-' + index">
              {{ med.name }} - {{ med.dose }} - {{ med.form }}
            </li>
          </ul>
          <p v-else class="text-sm text-gray-500">Sin tratamiento asignado.</p>
        </div>
      </div>
      <div class="col-span-1 md:col-span-3 bg-gray-50 rounded-xl p-2 space-y-1">
        <!-- Grupo 3: Notas y Observaciones -->
        <div>
          <h3 class="text-md font-semibold text-gray-700">📝 Notas</h3>
          <p class="text-sm text-gray-600">{{ summary.notes || "Sin notas." }}</p>
        </div>
        <div>
          <h3 class="text-md font-semibold text-gray-700">🔍 Observaciones</h3>
          <p class="text-sm text-gray-600">{{ summary.observations || "Sin observaciones." }}</p>
        </div>
      </div>
    </div>

    <!-- Grupo 4: Anexos -->
    <div class="bg-gray-50 rounded-xl p-2">
      <h3 class="text-md font-semibold text-gray-700">📎 Anexos</h3>
      <ul v-if="summary.attachments.length" class="list-disc pl-5 text-sm text-blue-600 underline">
        <li v-for="(file, index) in summary.attachments" :key="'file-' + index">
          <a :href="file.url" target="_blank">{{ file.name }}</a>
        </li>
      </ul>
      <p v-else class="text-sm text-gray-500">No hay archivos adjuntos.</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  doctor: String,
  date: String,
  summary: {
    type: Object,
    required: true,
    default: () => ({
      anamnesis: "",
      vitals: {
        temp: "",
        pa_systolic: "",
        pa_diastolic: "",
        fr: "",
        fc: "",
      },
      physicalExam: "",
      diagnosis: [],
      treatment: [],
      attachments: [],
      notes: "",
      observations: "",
    }),
  },
});
</script>
