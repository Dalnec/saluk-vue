import { api } from '../api/api';

export const createUpdatePatientAction = async (patient) => {

  if (patient.id) {
    return updatePatient(patient.id, patient);
  } else {
    return createPatient(patient);
  }
}

const createPatient = async (patient) => {
  try {
    const response = await api.post('/patients/', patient);
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
}

const updatePatient = async (patientId, patient) => {
  try {
    const response = await api.put(`/patients/${patientId}/`, patient);
    return response.data;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
}