import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createAnimalForClient } from "../../services/animal";
import { getClientById } from "../../services/client"; // Importar getClientById
import Modal from "../../components/common/Modal";
import AnimalForm from "../../components/Animals/Form"; // Import AnimalForm

const NewAnimal = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [clientName, setClientName] = useState(""); // Novo estado para o nome do cliente
  
  const [error, setError] = useState(null);
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success", // 'success' ou 'error'
  });

  useEffect(() => {
    const fetchClientName = async () => {
      try {
        const clientData = await getClientById(clientId);
        setClientName(clientData.name); // Assume que a resposta tem uma propriedade 'name'
      } catch (err) {
        console.error("Erro ao buscar nome do cliente:", err);
        setClientName("Cliente Desconhecido"); // Fallback
      }
    };

    if (clientId) {
      fetchClientName();
    }
  }, [clientId]);

  const handleSubmit = async (animalData) => {
    
    setError(null);
    try {
      await createAnimalForClient(clientId, animalData);
      setModalState({
        show: true,
        title: "Cadastro Realizado!",
        message: `Animal ${animalData.name} cadastrado com sucesso!`, // Mensagem dinâmica
        type: "success",
      });
    } catch (err) {
      setError(err.message || "Erro ao cadastrar animal.");
      console.error("Erro ao cadastrar animal:", err);
      setModalState({
        show: true,
        title: "Erro no Cadastro!",
        message:
          err.response?.data?.error ||
          "Ocorreu um erro ao cadastrar o animal. Tente novamente.", // Mensagem de erro da API ou genérica
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate(`/clients/${clientId}`);
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === "success") {
      navigate(`/clients/${clientId}`); // Redireciona apenas em caso de sucesso
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">
          Cadastrar Novo Animal para {clientName}
        </h1>

        <div className="bg-card shadow-md rounded-lg p-6">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              {error}
            </div>
          )}
          <AnimalForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            clientId={clientId}
          />
        </div>
      </div>

      {/* Modal de Sucesso */}
      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  );
};

export default NewAnimal;
