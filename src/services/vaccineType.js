import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const getVaccineTypes = async () => {
  return handleApiCall(
    () => api.get("/vaccine_types"),
    "Erro ao buscar os tipos de vacina:"
  );
};

export const createVaccineType = async (vaccineTypeData) => {
  return handleApiCall(
    () => api.post("/vaccine_types", { vaccine_type: vaccineTypeData }),
    "Erro ao criar o tipo de vacina:"
  );
};

export const updateVaccineType = async (vaccineTypeId, vaccineTypeData) => {
  return handleApiCall(
    () => api.put(`/vaccine_types/${vaccineTypeId}`, { vaccine_type: vaccineTypeData }),
    "Erro ao atualizar o tipo de vacina:"
  );
};

export const deleteVaccineType = async (vaccineTypeId) => {
  return handleApiCall(
    () => api.delete(`/vaccine_types/${vaccineTypeId}`),
    "Erro ao excluir o tipo de vacina:"
  );
};

export const getVaccineTypeById = async (vaccineTypeId) => {
  return handleApiCall(
    () => api.get(`/vaccine_types/${vaccineTypeId}`),
    "Erro ao buscar o tipo de vacina com ID:"
  );
};