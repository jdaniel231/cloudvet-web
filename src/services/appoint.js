import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const getAppointmentsByAnimal = async (animalId) => {
  return handleApiCall(
    () => api.get(`/animals/${animalId}/appointments`),
    `Erro ao buscar consultas para o animal com ID ${animalId}:`
  );
};

export const createAppointment = async (
  animalId,
  appointmentData,
  clientId = null // Passamos opcionalmente se o backend exigir
) => {
  const payload = { ...appointmentData };
  if (clientId) payload.client_id = clientId;

  return handleApiCall(
    () => api.post(`/animals/${animalId}/appointments`, { appointment: payload }),
    `Erro ao criar consulta para o animal com ID ${animalId}:`
  );
};

export const updateAppointment = async (
  appointmentId,
  appointmentData,
) => {
  return handleApiCall(
    () => api.put(`/appointments/${appointmentId}`, { appointment: appointmentData }),
    `Erro ao atualizar consulta com ID ${appointmentId}:`
  );
};

export const deleteAppointment = async (appointmentId) => {
  return handleApiCall(
    () => api.delete(`/appointments/${appointmentId}`),
    `Erro ao excluir consulta com ID ${appointmentId}:`
  );
};

export const getAppointmentById = async (appointmentId) => {
  return handleApiCall(
    () => api.get(`/appointments/${appointmentId}`),
    `Erro ao buscar consulta com ID ${appointmentId}:`
  );
};