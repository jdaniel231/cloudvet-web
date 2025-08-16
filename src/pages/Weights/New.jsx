import { useNavigate, useParams } from "react-router-dom";
import AnimalDetailsLayout from "../../components/Animals/AnimalDetailsLayout";
import WeightsForm from "../../components/Weights/Form";
import { createWeight } from "../../services/weight";
import Modal from "../../components/common/Modal";
import { useState } from "react";

const NewWeight = () => {
  const { clientId, animalId } = useParams();
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success", // 'success' ou 'error'
  });

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createWeight(clientId, animalId, formData);
      setModalState({
        show: true,
        title: "Cadastro Realizado!",
        message: `Peso cadastrado com sucesso!`, // Mensagem dinâmica
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao criar peso:", error);
      setModalState({
        show: true,
        title: "Erro no Cadastro!",
        message:
          error.response?.data?.error ||
          "Ocorreu um erro ao cadastrar o peso. Tente novamente.",
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
      <div className="bg-card shadow-md rounded-lg p-6">
        <WeightsForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>

      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </AnimalDetailsLayout>
  );
};

export default NewWeight;
