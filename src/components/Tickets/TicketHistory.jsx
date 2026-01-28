import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTicket, getTickets, getTicketsByAnimal } from "../../services/ticket";
import { Plus, Ticket, Clock, Eye, MessageSquare, Edit, Trash } from "lucide-react";
import DataTable from "../common/DataTable";
import Modal from "../common/Modal";

const TicketHistory = () => {
  const { clientId, animalId } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success", // 'success' ou 'error'
    onConfirm: null,
  });

  const navigate = useNavigate();

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const ticketsData = await getTicketsByAnimal(animalId);

      const sortedTickets = (ticketsData || []).sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );
      setTickets(sortedTickets);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      setErrorMsg("Erro ao carregar histórico de tickets.");
    } finally {
      setLoading(false);
    }
  }, [animalId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "aberto" || s === "open" || s === "pendente" || s === "pending")
      return "bg-amber-50 text-amber-700 border-amber-200";
    if (s === "pago" || s === "paid")
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    return "bg-slate-50 text-slate-700 border-slate-100";
  };

  const handleEdit = (ticketId) => {
    const ticket = tickets.find(t => t.id === ticketId);
    const resolvedClientId = clientId || ticket?.client_id || ticket?.animal?.client_id;

    if (!resolvedClientId) {
      console.error("Não foi possível encontrar o ID do cliente para editar o ticket.");
      return;
    }

    navigate(`/clients/${resolvedClientId}/animals/${animalId}/tickets/${ticketId}/edit`);
  };

  const handleDelete = (ticketId) => {
    setSelectedTicket(ticketId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedTicket) return;

    setShowConfirmModal(false);
    try {
      await deleteTicket(selectedTicket);
      setTickets((prev) => prev.filter((v) => v.id !== selectedTicket));
      setModalState({
        show: true,
        title: "Exclusão Realizada!",
        message: `Ticket "${selectedTicket.name}" excluído com sucesso!`,
        type: "success",
        onConfirm: null,
      });
      setSelectedTicket(null);
    } catch (error) {
      console.error("Erro ao excluir ticket:", error);
      setModalState({
        show: true,
        title: "Erro ao Excluir!",
        message:
          error.response?.data?.error ||
          "Ocorreu um erro ao excluir o ticket. Tente novamente.",
        type: "error",
        onConfirm: null,
      });
    }
  };

  const columns = [
    {
      header: "# ID",
      key: "id",
      render: (ticket) => (
        <span className="font-bold text-slate-400">#{ticket.id}</span>
      ),
    },
    {
      header: "Data Abertura",
      key: "created_at",
      render: (ticket) => (
        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          <Clock className="h-3.5 w-3.5" />
          {new Date(ticket.created_at).toLocaleDateString('pt-BR')}
        </div>
      ),
    },
    {
      header: "Valor a pagar",
      key: "subtotal",
      render: (ticket) => (
        <span className="font-bold text-slate-400">R$ {ticket.subtotal}</span>
      ),
    },
    {
      header: "Status",
      key: "payment_status",
      render: (ticket) => {
        const status = ticket.payment_status?.toLowerCase() || "pending";

        // Tradução do status
        const getStatusLabel = (status) => {
          if (status === "pending" || status === "aberto") return "Pendente";
          if (status === "paid" || status === "pago") return "Pago";
          return status;
        };

        return (
          <span className={
            status === "pending" || status === "aberto"
              ? "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border bg-amber-50 text-amber-700 border-amber-200"
              : status === "paid" || status === "pago"
                ? "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border bg-emerald-50 text-emerald-700 border-emerald-200"
                : "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border bg-slate-50 text-slate-700 border-slate-100"
          }>
            {getStatusLabel(status)}
          </span>
        );
      },
    },
    {
      header: "Ações",
      align: "right",
      render: (ticket) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleEdit(ticket.id)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Editar"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(ticket.id)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Deletar"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20 text-white">
              <Ticket className="h-5 w-5" />
            </div>
            Tickets de Atendimento
          </h3>
          <p className="text-slate-500 text-sm mt-1 ml-11">
            Histórico de solicitações e suporte para este animal
          </p>
        </div>

        <button
          onClick={() => navigate(`/clients/${clientId}/animals/${animalId}/tickets/new`)}
          className="group flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <span className="font-semibold text-sm">Novo Ticket</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={tickets}
          loading={loading}
          errorMsg={errorMsg}
          emptyMessage="Nenhum ticket registrado para este animal."
          emptyIcon={Ticket}
        />
        <Modal
          show={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o ticket "${selectedTicket?.id}"? Esta ação não pode ser desfeita.`}
          type="confirmation"
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default TicketHistory;