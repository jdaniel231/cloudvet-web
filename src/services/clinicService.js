import { api } from './api';
import { handleApiCall } from './apiUtils';

export const getClinicServices = async () => {
  return handleApiCall(
    () => api.get('/clinic_services'),
    'Erro ao buscar serviços da clínica:',
  );
};

export const getClinicServiceById = async (id) => {
  return handleApiCall(
    () => api.get(`/clinic_services/${id}`),
    'Erro ao buscar serviço da clínica:',
    (data) => {
      if (data && data.service) {
        return data.service;
      }
      return data;
    }
  );
};

export  const createClinicService = async (formData) => {
  return handleApiCall(
    () => api.post('/clinic_services', formData),
    'Erro ao criar serviço da clínica:',
    (data) => {
      if (data && data.service) {
        return data.service;
      }
      return data;
    }
  );
};

export const updateClinicService = async (id, data) => {
  return handleApiCall(
    () => api.put(`/clinic_services/${id}`, data),
    'Erro ao atualizar serviço da clínica:',
    (data) => {
      if (data && data.service) {
        return data.service;
      }
      return data;
    }
  );
};

export const deleteClinicService = async (id) => {
  return handleApiCall(
    () => api.delete(`/clinic_services/${id}`),
    'Erro ao excluir serviço da clínica:',
    (data) => {
      if (data && data.service) {
        return data.service;
      }
      return data;
    }
  );
};