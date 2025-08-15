import { api } from "./api";

export const getVaccineTypes = async () => {
  try {
    const response = await api.get("/vaccine_types");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os tipos de vacina:", error.response?.data || error.message);
    throw error;
  }
};

export const createVaccineType = async (vaccineTypeData) => {
  try {
    const response = await api.post("/vaccine_types", { vaccine_type: vaccineTypeData });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar o tipo de vacina:", error.response?.data || error.message);
    throw error;
  }
};

export const updateVaccineType = async (vaccineTypeId, vaccineTypeData) => {
  try {
    const response = await api.put(`/vaccine_types/${vaccineTypeId}`, { vaccine_type: vaccineTypeData });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o tipo de vacina:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteVaccineType = async (vaccineTypeId) => {
  try {
    const response = await api.delete(`/vaccine_types/${vaccineTypeId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir o tipo de vacina:", error.response?.data || error.message);
    throw error;
  }
};

export const getVaccineTypeById = async (vaccineTypeId) => {
  try {
    const response = await api.get(`/vaccine_types/${vaccineTypeId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o tipo de vacina com ID:", error.response?.data || error.message);
    throw error;
  }
};