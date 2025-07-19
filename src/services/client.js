import { api } from './api';

export const getClients = async () => {
  try {
    const response = await api.get('/clients');
    const data = response.data;
    if (data && Array.isArray(data.clients)) {
      return data.clients;
    }
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Erro ao buscar clientes:', error.response?.data || error.message);
    throw error;
  }
};

export const createClient = async (client) => {
  try {
    const response = await api.post('/clients', { client }); // Aninha o objeto client
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error.response?.data || error.message);
    throw error;
  }
};