import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVaccineType } from "../../services/vaccineType";
import VaccineTypeForm from "../../components/VaccineTypes/Form";
import Modal from "../../components/common/Modal";

export default function New() {
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success", // 'success' ou 'error'
  });

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createVaccineType(formData);
      setModalState({
        show: true,
        title: "Cadastro Realizado!",
        message: `Tipo de vacina cadastrado com sucesso!`, // Mensagem dinâmica
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao criar tipo de vacina:", error);
      setModalState({
        show: true,
        title: "Erro no Cadastro!",
        message:
          error.response?.data?.error ||
          "Ocorreu um erro ao cadastrar o tipo de vacina. Tente novamente.",
        type: "error",
      });
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === "success") {
      navigate("/vaccine_types");
    }
  };

  const handleCancel = () => {
    navigate("/vaccine_types");
  };

  return (
    <div className="bg-card shadow-md rounded-lg p-6">
      <VaccineTypeForm onSubmit={handleSubmit} onCancel={handleCancel} />
      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </div>
  );
}
