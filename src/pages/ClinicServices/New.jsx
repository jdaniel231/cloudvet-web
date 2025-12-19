import { useEffect, useState } from "react";
import { createClinicService } from "../../services/clinicService";
import { useNavigate } from "react-router-dom";
import ClinicServiceForm from "../../components/ClinicServices/Form";
import Modal from "../../components/common/Modal";

export default function New() {
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
        navigate("/clinic_services");
      }, 3000); // 3 segundos

      return () => clearTimeout(timer); // Cleanup
    }
  }, [modalState.show, modalState.type, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await createClinicService(formData);
      setModalState({
        show: true,
        title: "Cadastro Realizado!",
        message: `Serviço de clínica cadastrado com sucesso!`, // Mensagem dinâmica
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao criar serviço de clínica:", error);
      setModalState({
        show: true,
        title: "Erro no Cadastro!",
        message:
          error.response?.data?.error ||
          "Ocorreu um erro ao cadastrar o serviço de clínica. Tente novamente.",
        type: "error",
      });
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === "success") {
      navigate("/clinic_services");
    }
  };

  const handleCancel = () => {
    navigate("/clinic_services");
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 flex justify-center">
      <ClinicServiceForm onSubmit={handleSubmit} onCancel={handleCancel} />
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