<template>
  <div class="min-h-screen bg-gray-100">
    <HeaderBar :user="currentUser" :initials="getUserInitials(currentUser.name)" />
    <NavTabs :tabs="tabs" v-model="activeTab" />

    <main class="max-w-7xl mx-auto px-4 py-6">
      <Dashboard v-if="activeTab === 'dashboard'" :stats="dashboardStats" />
      <Patients
        v-else-if="activeTab === 'patients'"
        :patients="patients"
        :selected="selectedPatient"
        :search="searchTerm"
        v-model:search="searchTerm"
        @select="
          (e) => {
            selectedPatient = e;
            // getMedicalHistoryByPatient(selectedPatient.id);
          }
        "
        @back="selectedPatient = null"
        @reload="getPatients"
      />
      <AuditLog v-else-if="activeTab === 'audit'" :logs="auditLog" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import HeaderBar from "./components/HeaderBar.vue";
import NavTabs from "./components/NavTabs.vue";
import Dashboard from "./components/Dashboard.vue";
import Patients from "./components/Patients.vue";
import AuditLog from "./components/AuditLog.vue";
import { getAllPatientsAction } from "./actions/get-patient.action";
import { getDashBoardAction } from "./actions/get-history.action";

const activeTab = ref("dashboard");
const selectedPatient = ref(null);
const searchTerm = ref("");

const currentUser = ref({ name: "JNI Doctor", role: "General" });

const tabs = ref([
  { id: "dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt" },
  { id: "patients", label: "Pacientes", icon: "fas fa-users" },
  { id: "audit", label: "Auditoría", icon: "fas fa-shield-alt" },
]);

const dashboardStats = ref([]);

const patients = ref([]);
// const patients = ref([
//   {
//     id: "P001",
//     name: "Ana María Rodríguez",
//     age: 45,
//     gender: "Femenino",
//     birthDate: "1979-05-20",
//     phone: "+591-123-4567",
//     email: "ana.rodriguez@email.com",
//     bloodType: "O+",
//     allergies: ["Penicilina", "Mariscos"],
//     medicalHistory: [
//       { date: "2024-06-15", type: "Consulta", doctor: "Dr. Alan Grant", description: "Presión arterial normal." },
//       { date: "2024-05-20", type: "Examen", doctor: "Dr. Carlos Méndez", description: "Examen de sangre completo." },
//     ],
//   },
//   {
//     id: "P002",
//     name: "Roberto Mendoza",
//     age: 62,
//     gender: "Masculino",
//     birthDate: "1962-11-10",
//     phone: "+591-987-6543",
//     email: "roberto.mendoza@email.com",
//     bloodType: "A-",
//     allergies: ["Ninguna conocida"],
//     medicalHistory: [
//       { date: "2024-06-10", type: "Consulta", doctor: "Dr. Alan Grant", description: "Control de diabetes." },
//     ],
//   },
// ]);

const getPatients = async () => {
  const patientsData = await getAllPatientsAction();
  patients.value = patientsData.results || [];
};

const geDashboard = async () => {
  const stats = await getDashBoardAction();
  dashboardStats.value = [
    {
      label: "Pacientes",
      value: stats.pacientes || 0,
      icon: "patients",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      label: "Consultas Hoy",
      value: stats.consultas_hoy || 0,
      icon: "records",
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      label: "Alergias",
      value: stats.alergias || 0,
      icon: "allergies",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-700",
    },
    // {
    //   label: "Personas con Medicamentos",
    //   value: stats.medicamentos || 0,
    //   icon: "fas fa-pills",
    //   bgColor: "bg-purple-100",
    //   iconColor: "text-purple-500",
    // },
  ];
};

onMounted(() => {
  getPatients();
  geDashboard();
});

const auditLog = ref([
  {
    timestamp: "2024-06-15 14:30:00",
    user: "Dr. Alan Grant",
    action: "Acceso a historial",
    patient: "Ana María Rodríguez",
  },
  {
    timestamp: "2024-06-15 14:25:00",
    user: "Dr. Alan Grant",
    action: "Actualización de medicamentos",
    patient: "Ana María Rodríguez",
  },
  {
    timestamp: "2024-06-15 14:20:00",
    user: "Enf. Carmen López",
    action: "Registro de signos vitales",
    patient: "Roberto Mendoza",
  },
]);

const getUserInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");
</script>
