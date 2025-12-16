import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Eye, Pen, Trash, Dog, Cat, PawPrint, Plus } from "lucide-react";
import { deleteAnimal } from "../../services/animal";
import Modal from "../common/Modal";



const ClientAnimalList = ({ animals, clientId, onAnimalDeleted }) => {
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
    type: "confirmation",
  });

  const handleDelete = (animalId) => {
    setModalState({
      show: true,
      title: "Confirmar Exclusão",
      message: "Tem certeza que deseja excluir este animal?",
      type: "confirmation",
      onConfirm: async () => {
        try {
          await deleteAnimal(clientId, animalId);
          onAnimalDeleted(animalId);
          setModalState({
            show: false,
            title: "",
            message: "",
            onConfirm: null,
            type: "success",
          });
        } catch (error) {
          console.error("Erro ao excluir animal:", error);
          setModalState({
            show: true,
            title: "Erro!",
            message: "Ocorreu um erro ao excluir o animal.",
            onConfirm: null,
            type: "error",
          });
        }
      },
    });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
  };

  if (!animals || animals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <PawPrint className="h-8 w-8 text-slate-400" />
        </div>
        <p className="text-slate-600 font-medium mb-4">
          Nenhum animal encontrado para este cliente.
        </p>
        <Link
          to={`/clients/${clientId}/animals/new`}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-6 rounded-xl transition duration-300 shadow-lg shadow-cyan-600/20"
        >
          Adicionar Animal
        </Link>
      </div>
    );
  }

  const getIcon = (species) => {
    switch (species?.toLowerCase()) {
      case "cachorro": return <Dog className="h-8 w-8 text-white" />;
      case "gato": return <Cat className="h-8 w-8 text-white" />;
      default: return <PawPrint className="h-8 w-8 text-white" />;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="group relative bg-white rounded-3xl shadow-sm hover:shadow-premium transition-all duration-500 overflow-hidden border border-slate-100 hover:border-cyan-100"
          >
            {/* Card Header Gradient */}
            <div className="h-24 bg-gradient-to-r from-slate-100 to-slate-200 group-hover:from-cyan-50 group-hover:to-teal-50 transition-colors duration-500 relative">
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <Link
                  to={`/clients/${clientId}/animals/${animal.id}/edit`}
                  className="p-1.5 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white text-slate-500 hover:text-cyan-600 transition-colors"
                >
                  <Pen className="h-4 w-4" />
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(animal.id);
                  }}
                  className="p-1.5 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white text-slate-500 hover:text-red-500 transition-colors"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Avatar Content */}
            <div className="px-6 relative -mt-12 flex flex-col items-center">
              <div className={`w-24 h-24 rounded-full p-1.5 bg-white shadow-xl ${animal.species?.toLowerCase() === 'gato' ? 'shadow-purple-500/10' : 'shadow-cyan-500/10'
                }`}>
                <div className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${animal.species?.toLowerCase() === 'gato'
                  ? 'from-purple-500 to-indigo-500'
                  : 'from-cyan-500 to-teal-500'
                  }`}>
                  {getIcon(animal.species)}
                </div>
              </div>

              <div className="text-center mt-4 mb-6">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">
                  {animal.name}
                </h3>
                <p className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-block mt-2">
                  {animal.species} {animal.breed ? `• ${animal.breed}` : ""}
                </p>
              </div>

              <Link
                to={`/clients/${clientId}/animals/${animal.id}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 hover:bg-cyan-50 text-slate-600 hover:text-cyan-700 font-semibold rounded-xl transition-colors text-sm mb-6 group-hover:shadow-inner"
              >
                <Eye className="h-4 w-4" />
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        onConfirm={modalState.onConfirm}
      />
    </>
  );
};

ClientAnimalList.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      breed: PropTypes.string,
    }),
  ).isRequired,
  clientId: PropTypes.string.isRequired,
  onAnimalDeleted: PropTypes.func.isRequired,
};

export default ClientAnimalList;
