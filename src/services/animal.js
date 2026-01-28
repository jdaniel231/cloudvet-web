import { api } from "./api";
import { handleApiCall } from "./apiUtils";

// CRIAÇÃO: Continua precisando do clientId para saber de quem é o animal
export const createAnimalForClient = async (clientId, animalData) => {
  return handleApiCall(
    () => api.post(`/clients/${clientId}/animals`, { animal: animalData }),
    `Erro ao criar animal para o cliente com ID ${clientId}:`
  );
};

// BUSCAR POR ID: Agora é direto, só precisa do animalId
export const getAnimalById = async (animalId) => {
  return handleApiCall(
    () => api.get(`/animals/${animalId}`),
    `Erro ao buscar animal com ID ${animalId}:`
  );
};

// ATUALIZAR: Agora é direto, só precisa do animalId
export const updateAnimal = async (animalId, animalData) => {
  return handleApiCall(
    () => api.put(`/animals/${animalId}`, { animal: animalData }),
    `Erro ao atualizar animal com ID ${animalId}:`
  );
};

// EXCLUIR: Agora é direto, só precisa do animalId
export const deleteAnimal = async (animalId) => {
  return handleApiCall(
    () => api.delete(`/animals/${animalId}`),
    `Erro ao excluir animal com ID ${animalId}:`
  );
};

// BUSCAR POR CLIENTE
export const getAnimalsByClient = async (clientId) => {
  return handleApiCall(
    () => api.get(`/clients/${clientId}/animals`),
    `Erro ao buscar animais do cliente com ID ${clientId}:`
  );
};