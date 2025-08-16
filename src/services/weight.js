import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const getWeights = async (clientId, animalId) => {
  return handleApiCall(
    () => api.get(`/clients/${clientId}/animals/${animalId}/weights`),
    `Erro ao buscar pesos do animal com ID ${animalId}:`
  );
};

export const createWeight = async (clientId, animalId, formData) => {
  return handleApiCall(
    () => api.post(`/clients/${clientId}/animals/${animalId}/weights`, { weight: formData }),
    `Erro ao criar peso do animal com ID ${animalId}:`
  );
};

export const deleteWeight = async (clientId, animalId, weightId) => {
  return handleApiCall(
    () => api.delete(`/clients/${clientId}/animals/${animalId}/weights/${weightId}`),
    `Erro ao excluir peso do animal com ID ${animalId}:`
  );
};