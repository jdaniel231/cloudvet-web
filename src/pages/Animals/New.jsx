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
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            Novo Paciente
          </h1>
          <p className="text-slate-500">
            Cadastrando animal para o tutor <span className="font-bold text-slate-700">{clientName}</span>
          </p>
        </div>

        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl relative mb-6 flex items-center gap-2"
            role="alert"
          >
            <span className="font-bold">Erro:</span> {error}
          </div>
        )}

        <AnimalForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          clientId={clientId}
        />
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
