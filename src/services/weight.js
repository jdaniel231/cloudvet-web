import { api } from "./api";

export const getWeights = async (clientId, animalId) => {
  try {
    const response = await api.get(`/clients/${clientId}/animals/${animalId}/weights`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar pesos do animal com ID ${animalId}:`, error.response?.data || error.message);
    throw error;
  }
}

export const createWeight = async (clientId, animalId, formData) => {
  try {
    const response = await api.post(`/clients/${clientId}/animals/${animalId}/weights`, { weight: formData });
    return response.data;
  } catch (error) {
    console.error(`Erro ao criar peso do animal com ID ${animalId}:`, error.response?.data || error.message);
    throw error;
  }
}

export const deleteWeight = async (clientId, animalId, weightId) => {
  try {
    const response = await api.delete(`/clients/${clientId}/animals/${animalId}/weights/${weightId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir peso do animal com ID ${animalId}:`, error.response?.data || error.message);
    throw error;
  }
}