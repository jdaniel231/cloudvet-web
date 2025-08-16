import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const getClients = async () => {
  return handleApiCall(
    () => api.get("/clients"),
    "Erro ao buscar clientes:",
    (data) => {
      if (data && Array.isArray(data.clients)) {
        return data.clients;
      }
      return Array.isArray(data) ? data : [];
    }
  );
};

export const createClient = async (client) => {
  return handleApiCall(
    () => api.post("/clients", client),
    "Erro ao criar cliente:"
  );
};

export const updateClient = async (clientId, client) => {
  return handleApiCall(
    () => api.put(`/clients/${clientId}`, client),
    "Erro ao atualizar cliente:"
  );
};

export const deleteClient = async (clientId) => {
  return handleApiCall(
    () => api.delete(`/clients/${clientId}`),
    "Erro ao excluir cliente:"
  );
};

export const getClientById = async (clientId) => {
  return handleApiCall(
    () => api.get(`/clients/${clientId}`),
    `Erro ao buscar cliente com ID ${clientId}:`
  );
};

export const getClientAnimals = async (clientId) => {
  return handleApiCall(
    () => api.get(`/clients/${clientId}/animals`),
    `Erro ao buscar animais do cliente com ID ${clientId}:`
  );
};