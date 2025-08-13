import { api } from "./api";

export const createAnimalForClient = async (clientId, animalData) => {
  try {
    const response = await api.post(`/clients/${clientId}/animals`, { animal: animalData });
    return response.data;
  } catch (error) {
    console.error(`Erro ao criar animal para o cliente com ID ${clientId}:`, error.response?.data || error.message);
    throw error;
  }
};

export const getAnimalById = async (clientId, animalId) => {
  try {
    const response = await api.get(`/clients/${clientId}/animals/${animalId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar animal com ID ${animalId}:`, error.response?.data || error.message);
    throw error;
  }
};

export const updateAnimal = async (clientId, animalId, animalData) => {
  try {
    const response = await api.put(`/clients/${clientId}/animals/${animalId}`, { animal: animalData });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar animal com ID ${animalId}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteAnimal = async (clientId, animalId) => {
  try {
    const response = await api.delete(`/clients/${clientId}/animals/${animalId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir animal com ID ${animalId}:`, error.response?.data || error.message);
    throw error;
  }
};