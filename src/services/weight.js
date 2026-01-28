import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const getWeightsByAnimal = async (animalId) => {
  return handleApiCall(
    () => api.get(`/animals/${animalId}/weights`),
    `Erro ao buscar pesos do animal com ID ${animalId}:`
  );
};

export const createWeight = async (animalId, formData, clientId = null) => {
  const payload = { ...formData };
  if (clientId) payload.client_id = clientId;

  return handleApiCall(
    () => api.post(`/animals/${animalId}/weights`, { weight: payload }),
    `Erro ao criar peso do animal com ID ${animalId}:`
  );
};

export const deleteWeight = async (weightId) => {
  return handleApiCall(
    () => api.delete(`/weights/${weightId}`),
    `Erro ao excluir peso:`
  );
};