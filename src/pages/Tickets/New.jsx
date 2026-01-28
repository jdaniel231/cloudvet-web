import { useNavigate, useParams } from "react-router-dom";
import { createTicket } from "../../services/ticket";
import AnimalDetailsLayout from "../../components/Animals/AnimalDetailsLayout";
import Modal from "../../components/common/Modal";
import { TicketForm } from "../../components/Tickets/Form";
import { useState } from "react";
import { Ticket } from "lucide-react";

const NewTicket = () => {
  const { clientId, animalId } = useParams();
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
  });

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await createTicket(animalId, formData);

      setModalState({
        show: true,
        title: "Ticket Aberto!",
        message: "Sua solicitação foi registrada com sucesso e já está na nossa fila de atendimento.",
        type: "success",
      });
    } catch (error) {
      setModalState({
        show: true,
        title: "Erro ao abrir ticket",
        message: error.message || "Ocorreu um erro interno. Tente novamente mais tarde.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === "success") {
      navigate(`/clients/${clientId}/animals/${animalId}`);
    }
  };

  const handleCancel = () => {
    navigate(`/clients/${clientId}/animals/${animalId}`);
  };

  return (
    <AnimalDetailsLayout>
      <div className="w-full mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Novo Ticket de Suporte</h1>
          <p className="text-slate-500">Preencha os detalhes abaixo para iniciar um novo atendimento para este animal.</p>
        </div>
        <TicketForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={loading} />
      </div>

      <Modal
        show={modalState.show}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        onClose={handleCloseModal}
      />
    </AnimalDetailsLayout>
  );
};

export default NewTicket;