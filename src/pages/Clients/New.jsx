import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '../../services/client';
import Modal from '../../components/common/Modal';
import ClientForm from '../../components/Clients/Form'; // Importa o novo componente

export default function NewClient() {
  const [createdClientId, setCreatedClientId] = useState(null);
  const [modalState, setModalState] = useState({
    show: false,
    title: '',
    message: '',
    type: 'success',
  });
  const navigate = useNavigate();

  const handleSubmit = async (clientData) => {
    try {
      const newClient = await createClient(clientData);
      const clientId = newClient.client?.id ?? newClient.data?.id ?? newClient.id;
      setCreatedClientId(clientId);
      console.log('Novo Cliente:', newClient);
      setModalState({
        show: true,
        title: 'Cadastro Realizado!',
        message: `Cliente ${clientData.name} cadastrado com sucesso! Agora cadastro de animal.`,
        type: 'success',
      });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      setModalState({
        show: true,
        title: 'Erro no Cadastro!',
        message: error.response?.data?.error || 'Ocorreu um erro ao cadastrar o cliente. Tente novamente.',
        type: 'error',
      });
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === 'success') {
      if (createdClientId) {
        navigate(`/clients/${createdClientId}/animals/new`);
      } else {
        navigate('/clients/new');
      }
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">Novo Cliente</h1>
        <div className="bg-card shadow-md rounded-lg p-6">
          <ClientForm onSubmit={handleSubmit} />
        </div>
      </div>

      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  );
}