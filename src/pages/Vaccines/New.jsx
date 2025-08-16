import { useNavigate, useParams } from "react-router-dom";
import { createVaccine } from "../../services/vaccine";
import AnimalDetailsLayout from "../../components/Animals/AnimalDetailsLayout";
import Modal from "../../components/common/Modal";
import { VaccineForm } from "../../components/Vaccines/Form";
import { useState } from "react";

const NewVaccine = () => {
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
      if (!formData.vaccine_type_id || formData.vaccine_type_id.length === 0) {
        setModalState({
          show: true,
          title: "Nenhuma vacina selecionada",
          message: "Por favor, selecione pelo menos um tipo de vacina.",
          type: "error",
        });
        return;
      }

      await createVaccine(clientId, animalId, formData);
      setModalState({
        show: true,
        title: "Vacina Cadastrada",
        message: "As vacinas foram cadastradas com sucesso",
        type: "success",
      });
    } catch (error) {
      setModalState({
        show: true,
        title: "Erro ao cadastrar a vacina",
        message: error.message,
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
        <VaccineForm onSubmit={handleSubmit} onCancel={handleCancel} />
        <Modal
          show={modalState.show}
          title={modalState.title}
          message={modalState.message}
          type={modalState.type}
          onClose={handleCloseModal}
        />
      </div>
    </AnimalDetailsLayout>
  );
};

export default NewVaccine;
