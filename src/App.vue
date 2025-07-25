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
        @select="selectedPatient = $event"
        @back="selectedPatient = null"
      />
      <AuditLog v-else-if="activeTab === 'audit'" :logs="auditLog" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import HeaderBar from "./components/HeaderBar.vue";
import NavTabs from "./components/NavTabs.vue";
import Dashboard from "./components/Dashboard.vue";
import Patients from "./components/Patients.vue";
import AuditLog from "./components/AuditLog.vue";

const activeTab = ref("dashboard");
const selectedPatient = ref(null);
const searchTerm = ref("");

const currentUser = ref({ name: "Dra. Kruely La Caun", role: "Potologa" });

const tabs = ref([
  { id: "dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt" },
  { id: "patients", label: "Pacientes", icon: "fas fa-users" },
  { id: "audit", label: "Auditoría", icon: "fas fa-shield-alt" },
]);

const dashboardStats = ref([
  { label: "Pacientes", value: 150, icon: "fas fa-users", bgColor: "bg-blue-100", iconColor: "text-blue-500" },
  {
    label: "Consultas Hoy",
    value: 8,
    icon: "fas fa-calendar-day",
    bgColor: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    label: "Alergias Críticas",
    value: 3,
    icon: "fas fa-exclamation-triangle",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
  { label: "Medicamentos", value: 15, icon: "fas fa-pills", bgColor: "bg-purple-100", iconColor: "text-purple-500" },
]);

const patients = ref([
  {
    id: "P001",
    name: "Ana María Rodríguez",
    age: 45,
    gender: "Femenino",
    birthDate: "1979-05-20",
    phone: "+591-123-4567",
    email: "ana.rodriguez@email.com",
    bloodType: "O+",
    allergies: ["Penicilina", "Mariscos"],
    medicalHistory: [
      { date: "2024-06-15", type: "Consulta", doctor: "Dr. Alan Grant", description: "Presión arterial normal." },
      { date: "2024-05-20", type: "Examen", doctor: "Dr. Carlos Méndez", description: "Examen de sangre completo." },
    ],
  },
  {
    id: "P002",
    name: "Roberto Mendoza",
    age: 62,
    gender: "Masculino",
    birthDate: "1962-11-10",
    phone: "+591-987-6543",
    email: "roberto.mendoza@email.com",
    bloodType: "A-",
    allergies: ["Ninguna conocida"],
    medicalHistory: [
      { date: "2024-06-10", type: "Consulta", doctor: "Dr. Alan Grant", description: "Control de diabetes." },
    ],
  },
]);

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
