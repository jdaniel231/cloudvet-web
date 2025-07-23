import { api } from "./api";

export const getAppointments = async (clientId, animalId) => {
  try {
    const response = await api.get(`/clients/${clientId}/animals/${animalId}/appointments`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar consultas para o animal com ID ${animalId}:`, error.response?.data || error.message);
    throw error;
  }
}

export const createAppointment = async (clientId, animalId, appointmentData) => {
  try {
    const response = await api.post(`/clients/${clientId}/animals/${animalId}/appointments`, { appointment: appointmentData });
    return response.data;
  } catch (error) {
    console.error(`Erro ao criar consulta para o animal com ID ${animalId}:`, error.response?.data || error.message);
    throw error;
  }
}

export const updateAppointment = async (clientId, animalId, appointmentId, appointmentData) => {
  try {
    const response = await api.put(`/clients/${clientId}/animals/${animalId}/appointments/${appointmentId}`, { appointment: appointmentData });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar consulta para o animal com ID ${animalId}:`, error.response?.data || error.message);
    throw error;
  }
}

export const deleteAppointment = async (clientId, animalId, appointmentId) => {
  try {
    const response = await api.delete(`/clients/${clientId}/animals/${animalId}/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir consulta para o animal com ID ${animalId}:`, error.response?.data || error.message);
   throw error;
  }
}

export const getAppointmentById = async (clientId, animalId, appointmentId) => {
  try {
    const response = await api.get(`/clients/${clientId}/animals/${animalId}/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar consulta com ID ${appointmentId}:`, error.response?.data || error.message);
    throw error;
  }
}

