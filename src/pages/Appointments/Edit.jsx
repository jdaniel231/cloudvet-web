import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointmentById, updateAppointment } from '../../services/appoint';
import AnimalDetailsLayout from '../../components/Animals/AnimalDetailsLayout';
import AppointmentForm from '../../components/Appointments/Form';
import Modal from '../../components/common/Modal';

const EditAppointment = () => {
  const { clientId, animalId, appointmentId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [modalState, setModalState] = useState({ show: false, title: '', message: '', type: 'success' });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const data = await getAppointmentById(clientId, animalId, appointmentId);
        setInitialData(data);
      } catch (error) {
        console.error('Erro ao buscar dados da consulta:', error);
        setModalState({ show: true, title: 'Erro!', message: 'Não foi possível carregar os dados da consulta.', type: 'error' });
      }
    };

    fetchAppointment();
  }, [clientId, animalId, appointmentId]);

  const handleSubmit = async (formData) => {
    try {
      await updateAppointment(clientId, animalId, appointmentId, formData);
      setModalState({ show: true, title: 'Sucesso!', message: 'Consulta atualizada com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao atualizar consulta:', error);
      setModalState({ show: true, title: 'Erro!', message: error.response?.data?.error || 'Ocorreu um erro ao atualizar a consulta.', type: 'error' });
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

  if (!initialData) {
    return <AnimalDetailsLayout><div>Loading...</div></AnimalDetailsLayout>;
  }

  return (
    <AnimalDetailsLayout>
      <div className="bg-card shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-text mb-4">Editar Consulta</h2>
        <AppointmentForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditMode={true}
        />
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

export default EditAppointment;
