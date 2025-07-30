import { api } from '../api/api';

export const getPatientByIdAction = async (patientId) => {
    try {
        const response = await api.get(`/patients/${patientId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patient:', error);
        throw error;
    }
}

export const getAllPatientsAction = async () => {
    try {
        const response = await api.get('/patients/');
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
}

export const searchPatientAction = async (document) => {
    try {
        const response = await api.get(`/patients/apiclient/${document}/`);
        return response;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
}

export const searchListPatientAction = async (search) => {
    try {
        const response = await api.get(`/patients/`, { params: { search } });
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
}

export const reportPatientAction = async (search) => {
    try {
        const response = await api.get(`/reportpatients/`, {
            params: { search },
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            responseType: 'blob'
        });
        return response;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
}