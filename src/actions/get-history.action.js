import { api } from '../api/api';

export const getHistoryByIdAction = async (historyId) => {
    try {
        const response = await api.get(`/medicalhistory/${historyId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching history:', error);
        throw error;
    }
}

export const getAllHistoryAction = async (params) => {
    try {
        const response = await api.get('/medicalhistory/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching history:', error);
        throw error;
    }
}

export const getDashBoardAction = async () => {
    try {
        const response = await api.get('/medicalhistory/get_dashboard/', {});
        return response.data;
    } catch (error) {
        console.error('Error fetching history:', error);
        throw error;
    }
}