import { api } from '../api/api';

export const createUpdateHistoryAction = async (history) => {
  console.log(history);

  if (history.id) {
    return updateHistory(history);
  } else {
    return createHistory(history);
  }
}

const createHistory = async (history) => {
  try {
    const cleanHistory = JSON.parse(JSON.stringify(history));
    const response = await api.post('/medicalhistory/', cleanHistory);
    return response.data;
  } catch (error) {
    console.error('Error creating history:', error);
    throw error;
  }
}

const updateHistory = async (history) => {
  try {
    const cleanHistory = JSON.parse(JSON.stringify(history));
    const response = await api.put(`/medicalhistory/${history.id}/`, cleanHistory);
    return response.data;
  } catch (error) {
    console.error('Error updating history:', error);
    throw error;
  }
}

export const deleteDiagnosisHistoryAction = async (historyId) => {
  try {
    const response = await api.delete(`/diagnosis/${historyId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting history:', error);
    throw error;
  }
}

export const deleteTreatmentHistoryAction = async (historyId) => {
  try {
    const response = await api.delete(`/treatment/${historyId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting history:', error);
    throw error;
  }
}