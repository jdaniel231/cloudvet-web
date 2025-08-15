import { api } from "./api";  

export const getVaccines = async (clientId, animalId) => {
  try{
    const response = await api.get(`/clients/${clientId}/animals/${animalId}/vaccines`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vacinas:", error.response?.data || error.message);
    throw error;
  }
}

export const createVaccine = async (clientId, animalId, vaccine) => {
  try {
    const response = await api.post(`/clients/${clientId}/animals/${animalId}/vaccines`, { vaccine });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar vacina:", error.response?.data || error.message);
    throw error;
  }
};

export const updateVaccine = async (clientId, animalId, vaccineId, vaccine) => {
  try {
    const response = await api.put(`/clients/${clientId}/animals/${animalId}/vaccines/${vaccineId}`, { vaccine });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar vacina:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteVaccine = async (clientId, animalId, vaccineId) => {
  try {
    const response = await api.delete(`/clients/${clientId}/animals/${animalId}/vaccines/${vaccineId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir vacina:", error.response?.data || error.message);
    throw error;
  }
};

export const getVaccineById = async (clientId, animalId, vaccineId) => {
  try {
    const response = await api.get(`/clients/${clientId}/animals/${animalId}/vaccines/${vaccineId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vacina com ID:", error.response?.data || error.message);
    throw error;
  }
};