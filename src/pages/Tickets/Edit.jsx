import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTicketById, updateTicket } from "../../services/ticket";
import { TicketForm } from "../../components/Tickets/Form";
import AnimalDetailsLayout from "../../components/Animals/AnimalDetailsLayout";
import Modal from "../../components/common/Modal";

export default function Edit() {
  const { clientId, animalId, ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success", // 'success' ou 'error'
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketData = await getTicketById(ticketId);
        setTicket(ticketData);
      } catch (error) {
        console.error("Erro ao buscar ticket:", error);
      }
    };

    if (ticketId) {
      fetchData();
    }
  }, [ticketId]);

  useEffect(() => {
    if (modalState.show && modalState.type === "success") {
      const timer = setTimeout(() => {
        setModalState({ ...modalState, show: false });
        navigate("/tickets");
      }, 3000); // 3 segundos

      return () => clearTimeout(timer); // Cleanup
    }
  }, [modalState.show, modalState.type, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await updateTicket(ticketId, formData);
      setModalState({
        show: true,
        title: "Atualização Realizada!",
        message: `Ticket ${formData.subject || ticket?.subject || ''} atualizado com sucesso!`,
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao atualizar ticket:", error);
      setModalState({
        show: true,
        title: "Erro na Atualização!",
        message:
          error.response?.data?.error ||
          "Ocorreu um erro ao atualizar o ticket. Tente novamente.",
        type: "error",
      });
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
          <h1 className="text-3xl font-bold text-slate-800">Editar Ticket</h1>
          <p className="text-slate-500">Preencha os detalhes abaixo para editar o ticket.</p>
        </div>
        <TicketForm
          initialData={ticket}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={loading} />
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
}   