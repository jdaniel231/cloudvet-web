import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const getAppointments = async (clientId, animalId) => {
  return handleApiCall(
    () => api.get(`/clients/${clientId}/animals/${animalId}/appointments`),
    `Erro ao buscar consultas para o animal com ID ${animalId}:`
  );
};

export const createAppointment = async (
  clientId,
  animalId,
  appointmentData,
) => {
  return handleApiCall(
    () => api.post(`/clients/${clientId}/animals/${animalId}/appointments`, { appointment: appointmentData }),
    `Erro ao criar consulta para o animal com ID ${animalId}:`
  );
};

export const updateAppointment = async (
  clientId,
  animalId,
  appointmentId,
  appointmentData,
) => {
  return handleApiCall(
    () => api.put(`/clients/${clientId}/animals/${animalId}/appointments/${appointmentId}`, { appointment: appointmentData }),
    `Erro ao atualizar consulta para o animal com ID ${animalId}:`
  );
};

export const deleteAppointment = async (clientId, animalId, appointmentId) => {
  return handleApiCall(
    () => api.delete(`/clients/${clientId}/animals/${animalId}/appointments/${appointmentId}`),
    `Erro ao excluir consulta para o animal com ID ${animalId}:`
  );
};

export const getAppointmentById = async (clientId, animalId, appointmentId) => {
  return handleApiCall(
    () => api.get(`/clients/${clientId}/animals/${animalId}/appointments/${appointmentId}`),
    `Erro ao buscar consulta com ID ${appointmentId}:`
  );
};