import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const getTickets = () => {
  return handleApiCall(
    () => api.get("/tickets"),
    'Erro ao buscar tickets:',
    (data) => {
      if (data && data.tickets) {
        return data.tickets;
      }
      return data;
    }
  );
};

export const createTicket = (animalId, ticketData) => {
  return handleApiCall(
    () => api.post(`/animals/${animalId}/tickets`, { ticket: ticketData }),
    'Erro ao criar ticket:',
    (data) => {
      return data?.ticket || data;
    }
  );
};

export const getTicketsByAnimal = (animalId) => {
  return handleApiCall(
    () => api.get(`/animals/${animalId}/tickets`),
    'Erro ao buscar tickets do animal:',
    (data) => {
      if (data && data.tickets) {
        return data.tickets;
      }
      return data;
    }
  );
};

export const getTicketById = (ticketId) => {
  return handleApiCall(
    () => api.get(`/tickets/${ticketId}`),
    'Erro ao buscar detalhes do ticket:',
    (data) => {
      return data?.ticket || data;
    }
  );
};

export const updateTicket = (ticketId, ticketData) => {
  return handleApiCall(
    () => api.put(`/tickets/${ticketId}`, { ticket: ticketData }),
    'Erro ao atualizar ticket:',
    (data) => {
      return data?.ticket || data;
    }
  );
};

export const deleteTicket = (ticketId) => {
  return handleApiCall(
    () => api.delete(`/tickets/${ticketId}`),
    'Erro ao excluir ticket:',
    (data) => {
      return data?.ticket || data;
    }
  );
};