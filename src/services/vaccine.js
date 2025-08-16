import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const getVaccines = async (clientId, animalId) => {
  return handleApiCall(
    () => api.get(`/clients/${clientId}/animals/${animalId}/vaccines`),
    "Erro ao buscar vacinas:"
  );
};

export const createVaccine = async (clientId, animalId, vaccine) => {
  return handleApiCall(
    () => api.post(`/clients/${clientId}/animals/${animalId}/vaccines`, { vaccine }),
    "Erro ao criar vacina:"
  );
};

export const updateVaccine = async (clientId, animalId, vaccineId, vaccine) => {
  return handleApiCall(
    () => api.put(`/clients/${clientId}/animals/${animalId}/vaccines/${vaccineId}`, { vaccine }),
    "Erro ao atualizar vacina:"
  );
};

export const deleteVaccine = async (clientId, animalId, vaccineId) => {
  return handleApiCall(
    () => api.delete(`/clients/${clientId}/animals/${animalId}/vaccines/${vaccineId}`),
    "Erro ao excluir vacina:"
  );
};

export const getVaccineById = async (clientId, animalId, vaccineId) => {
  return handleApiCall(
    () => api.get(`/clients/${clientId}/animals/${animalId}/vaccines/${vaccineId}`),
    "Erro ao buscar vacina com ID:"
  );
};