import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteClient, getClientById, updateClient } from "../../services/client";
import Modal from "../../components/common/Modal";
import ClientForm from "../../components/Clients/Form";

const EditClient = () => {

  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [modalState, setModalState] = useState({
    show: false,
    title: '',
    message: '',
    type: 'success',
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Novo estado para o modal de confirmação
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const clientData = await getClientById(id);
        setClient(clientData);
      } catch (err) {
        console.error(err);
      } 
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (clientData) => {
    try {
      await updateClient(id, clientData);
      console.log('Cliente atualizado:');
      setModalState({
        show: true,
        title: 'Atualização Realizada!',
        message: `Cliente ${clientData.name} atualizado com sucesso!`,
        type: 'success',
      });
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      setModalState({
        show: true,
        title: 'Erro no Atualizar!',
        message: error.response?.data?.error || 'Ocorreu um erro ao atualizar o cliente. Tente novamente.',
        type: 'error',
      });
    }
  }

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === 'success' && modalState.title === 'Exclusão Realizada!') { // Redireciona após exclusão
      navigate('/clients');
    } else if (modalState.type === 'success') { // Redireciona após atualização
      navigate(`/clients/${id}`);
    }
  };

  const handleDelete = () => {
    setShowConfirmModal(true); // Exibe o modal de confirmação
  };

  const confirmDelete = async () => {
    setShowConfirmModal(false); // Fecha o modal de confirmação
    try {
      await deleteClient(id);
      console.log('Cliente deletado com sucesso!');
      setModalState({
        show: true,
        title: 'Exclusão Realizada!',
        message: `Cliente ${client.name} excluído com sucesso!`,
        type: 'success',
      });
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      setModalState({
        show: true,
        title: 'Erro no Excluir!',
        message: error.response?.data?.error || 'Ocorreu um erro ao excluir o cliente. Tente novamente.',
        type: 'error',
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <nav className="text-sm text-gray-500 mb-4">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/clients" className="text-blue-600 hover:underline">Clientes</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link to={`/clients/${id}`} className="text-blue-600 hover:underline">
                <span>{client?.name}</span>
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <span>Editar</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold mb-6">Editar Cliente</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {client && <ClientForm initialData={client} onSubmit={handleSubmit} isEditMode={true} />}
          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Excluir Cliente
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o cliente ${client?.name}? Esta ação não pode ser desfeita.`}
        type="warning" // Pode ser um tipo diferente para indicar confirmação
        onConfirm={confirmDelete} // Adiciona um botão de confirmação
        showCancelButton={true} // Mostra o botão de cancelar
      />
    </>
  );
};

export default EditClient;