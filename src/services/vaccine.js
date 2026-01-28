import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const getVaccinesByAnimal = async (animalId) => {
  return handleApiCall(
    () => api.get(`/animals/${animalId}/vaccines`),
    "Erro ao buscar vacinas:"
  );
};

export const createVaccine = async (animalId, vaccine, clientId = null) => {
  const payload = { ...vaccine };
  if (clientId) payload.client_id = clientId;

  return handleApiCall(
    () => api.post(`/animals/${animalId}/vaccines`, { vaccine: payload }),
    "Erro ao criar vacina:"
  );
};

export const updateVaccine = async (vaccineId, vaccine) => {
  return handleApiCall(
    () => api.put(`/vaccines/${vaccineId}`, { vaccine }),
    "Erro ao atualizar vacina:"
  );
};

export const deleteVaccine = async (vaccineId) => {
  return handleApiCall(
    () => api.delete(`/vaccines/${vaccineId}`),
    "Erro ao excluir vacina:"
  );
};

export const getVaccineById = async (vaccineId) => {
  return handleApiCall(
    () => api.get(`/vaccines/${vaccineId}`),
    "Erro ao buscar vacina:"
  );
};