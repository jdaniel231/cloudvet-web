import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createVaccineType } from "../../services/vaccineType";
import VaccineTypeForm from "../../components/VaccineTypes/Form";
import Modal from "../../components/common/Modal";

export default function New() {
  const [isSaving, setIsSaving] = useState(false);
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success", // 'success' ou 'error'
  });

  const navigate = useNavigate();

  // Auto-close modal de sucesso após 3 segundos
  useEffect(() => {
    if (modalState.show && modalState.type === "success") {
      const timer = setTimeout(() => {
        setModalState({ ...modalState, show: false });
        navigate("/vaccine_types");
      }, 3000); // 3 segundos

      return () => clearTimeout(timer); // Cleanup
    }
  }, [modalState.show, modalState.type, navigate]);

  const handleSubmit = async (formData) => {
    setIsSaving(true);
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
    } finally {
      setIsSaving(false);
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
    <div className="w-full mx-auto p-4 md:p-8 flex justify-center">
      <VaccineTypeForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={isSaving}
      />
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
