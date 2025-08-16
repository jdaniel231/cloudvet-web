import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const createAnimalForClient = async (clientId, animalData) => {
  return handleApiCall(
    () => api.post(`/clients/${clientId}/animals`, { animal: animalData }),
    `Erro ao criar animal para o cliente com ID ${clientId}:`
  );
};

export const getAnimalById = async (clientId, animalId) => {
  return handleApiCall(
    () => api.get(`/clients/${clientId}/animals/${animalId}`),
    `Erro ao buscar animal com ID ${animalId}:`
  );
};

export const updateAnimal = async (clientId, animalId, animalData) => {
  return handleApiCall(
    () => api.put(`/clients/${clientId}/animals/${animalId}`, { animal: animalData }),
    `Erro ao atualizar animal com ID ${animalId}:`
  );
};

export const deleteAnimal = async (clientId, animalId) => {
  return handleApiCall(
    () => api.delete(`/clients/${clientId}/animals/${animalId}`),
    `Erro ao excluir animal com ID ${animalId}:`
  );
};