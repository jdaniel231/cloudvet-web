import { useParams, useNavigate } from 'react-router-dom';
import AnimalDetailsLayout from '../../components/Animals/AnimalDetailsLayout';
import AppointmentForm from '../../components/Appointments/Form';
import { createAppointment } from '../../services/appoint';
import Modal from '../../components/common/Modal';
import { useState } from 'react';


const NewAppointment = () => {
  const { clientId, animalId } = useParams();
  const [modalState, setModalState] = useState({
    show: false,
    title: '',
    message: '',
    type: 'success', // 'success' ou 'error'
  });
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createAppointment(clientId, animalId, formData);
      setModalState({
        show: true,
        title: 'Cadastro Realizado!',
        message: `Consulta cadastrada com sucesso!`, // Mensagem dinâmica
        type: 'success',
      });
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      setModalState({
        show: true,
        title: 'Erro no Cadastro!',
        message: error.response?.data?.error || 'Ocorreu um erro ao cadastrar a consulta. Tente novamente.',
        type: 'error',
      });
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === 'success') {
      navigate(`/clients/${clientId}/animals/${animalId}`);
    }
  };

  const handleCancel = () => {
   navigate(`/clients/${clientId}/animals/${animalId}`);
  };

  return (
    <AnimalDetailsLayout>
      <div className="bg-card shadow-md rounded-lg p-6">
        <AppointmentForm onSubmit={handleSubmit} onCancel={handleCancel} />
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

export default NewAppointment;
