import { useEffect, useState } from "react";
import { deleteTicket, getTickets } from "../../services/ticket";
import {
  Search,
  Ticket,
  Clock,
  User,
  Dog,
  ChevronRight,
  Filter,
  AlertCircle,
  Eye,
  Edit,
  Trash
} from "lucide-react";
import DataTable from "../../components/common/DataTable";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal";

export default function TicketsIndex() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [modalState, setModalState] = useState({
    show: false,
    type: "confirm",
    title: "",
    message: "",
    onConfirm: () => { },
    onCancel: () => { }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getTickets();
        setTickets(data || []);
      } catch (err) {
        console.error("Erro ao carregar tickets:", err);
        setErrorMsg("Não foi possível carregar os tickets.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "aberto" || s === "open") return "bg-amber-50 text-amber-700 border-amber-100";
    if (s === "em atendimento" || s === "in progress") return "bg-blue-50 text-blue-700 border-blue-100";
    if (s === "resolvido" || s === "resolved" || s === "concluído") return "bg-emerald-50 text-emerald-700 border-emerald-100";
    return "bg-slate-50 text-slate-700 border-slate-100";
  };

  const filteredTickets = tickets.filter(t =>
    t.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.animal_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(t.id).includes(searchTerm)
  );

  const handleEdit = (ticket) => {
    const clientId = ticket.client_id || ticket.animal?.client_id || ticket.animal?.client?.id;
    const animalId = ticket.animal_id || ticket.animal?.id;

    if (!clientId || !animalId) {
      console.warn("Navegação interrompida: IDs ausentes", { clientId, animalId });
      return;
    }

    navigate(`/clients/${clientId}/animals/${animalId}/tickets/${ticket.id}/edit`);
  };

  const handleDelete = (ticketId) => {
    setSelectedTicketId(ticketId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedTicketId) return;
    setShowConfirmModal(false);
    try {
      await deleteTicket(selectedTicketId);
      setTickets((prev) => prev.filter((v) => v.id !== selectedTicketId));
      setModalState({
        show: true,
        title: "Exclusão Realizada!",
        message: `Ticket "${selectedTicketId.name}" excluído com sucesso!`,
        type: "success",
        onConfirm: null,
      });
      setSelectedTicketId(null);
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
      header: "Tickets",
      key: "id",
      render: (ticket) => (
        <span className="font-bold text-slate-400">#{ticket.id}</span>
      ),
    },
    {
      header: "Cliente",
      key: "client_name",
      render: (ticket) => (
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-700">
            {ticket.client_name || "Cliente não encontrado"}
          </span>
        </div>
      ),
    },
    {
      header: "Animal",
      key: "animal_id",
      render: (ticket) => (
        <div className="flex items-center gap-2 text-slate-600">
          <span className="font-medium">{ticket.animal?.name || `Animal #${ticket.animal_id}`}</span>
        </div>
      ),
    },
    {
      header: "Data de Abertura",
      key: "created_at",
      render: (ticket) => (
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Clock className="h-3.5 w-3.5" />
          {new Date(ticket.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>
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
            onClick={() => handleEdit(ticket)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Editar Ticket"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(ticket.id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Excluir Ticket"
          >
            <Trash className="h-5 w-5" />
          </button>

        </div>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto p-4 md:p-8 space-y-8 min-h-screen bg-slate-50/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Central de Tickets
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Gerencie os atendimentos e solicitações abertas
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden backdrop-blur-xl">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Buscar por ID, cliente ou animal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200 text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <Ticket className="h-4 w-4 text-slate-400" />
            <span>{filteredTickets.length} Atendimentos</span>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          data={filteredTickets}
          columns={columns}
          loading={loading}
          errorMsg={errorMsg}
          searchTerm={searchTerm}
          emptyMessage="Nenhum ticket encontrado."
          emptyIcon={Ticket}
        />

        <Modal
          show={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o ticket? Esta ação não pode ser desfeita.`}
          type="confirmation"
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}