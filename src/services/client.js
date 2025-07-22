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
    const response = await api.post('/clients', client); // Remove o aninhamento do objeto client
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error.response?.data || error.message);
    throw error;
  }
};

export const updateClient = async (clientId, client) => {
  try {
    const response = await api.put(`/clients/${clientId}`, client); // Remove o aninhamento do objeto client
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteClient = async (clientId) => {
  try {
    const response = await api.delete(`/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir cliente:', error.response?.data || error.message);
    throw error;
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar cliente com ID ${clientId}:`, error.response?.data || error.message);
    throw error;
  }
};

export const getClientAnimals = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}/animals`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar animais do cliente com ID ${clientId}:`, error.response?.data || error.message);
    throw error;
  }
};