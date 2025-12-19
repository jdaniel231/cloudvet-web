import { useEffect, useState } from "react";
import ClinicServiceForm from "../../components/ClinicServices/Form";
import Modal from "../../components/common/Modal";
import { getClinicServiceById, updateClinicService } from "../../services/clinicService";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {

  const { id } = useParams();
  const [clinicService, setClinicService] = useState(null);
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success", // 'success' ou 'error'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clinicServiceData = await getClinicServiceById(id);
        setClinicService(clinicServiceData);
      } catch (error) {
        console.error("Erro ao buscar serviço da clínica:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
      await updateClinicService(id, formData);
      setModalState({
        show: true,
        title: "Atualização Realizada!",
        message: `Serviço da clínica ${formData.name || clinicService?.name || ''} atualizado com sucesso!`,
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao atualizar serviço da clínica:", error);
      setModalState({
        show: true,
        title: "Erro no Atualização!",
        message:
          error.response?.data?.error ||
          "Ocorreu um erro ao atualizar o serviço da clínica. Tente novamente.",
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
    <>
      <div className="w-full max-w-4xl mx-auto p-4 md:p-8 flex justify-center">
        {clinicService ? (
          <ClinicServiceForm
            initialData={clinicService}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <div className="text-slate-500 font-medium">Carregando...</div>
        )}
      </div>
      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  )
}