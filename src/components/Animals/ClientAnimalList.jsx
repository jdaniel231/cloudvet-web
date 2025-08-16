import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faCat, faPaw } from "@fortawesome/free-solid-svg-icons";
import { Eye, Pen, Trash } from "lucide-react";
import { deleteAnimal } from "../../services/animal";
import Modal from "../common/Modal";

const speciesIcons = {
  cachorro: faDog,
  cão: faDog,
  gato: faCat,
  default: faPaw,
};

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
      <div className="text-center py-4">
        <p className="text-lightText mb-4">
          Nenhum animal encontrado para este cliente.
        </p>
        <Link
          to={`/clients/${clientId}/animals/new`}
          className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Adicionar Animal
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link
          to={`/clients/${clientId}/animals/new`}
          className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Adicionar Animal
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="bg-card rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="p-4 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mb-3 border-2 border-border text-4xl text-primary">
                <FontAwesomeIcon
                  icon={
                    speciesIcons[animal.species?.toLowerCase()] ||
                    speciesIcons.default
                  }
                />
              </div>
              <h3 className="text-xl font-semibold text-text mb-1">
                {animal.name}
              </h3>
              <p className="text-sm text-lightText mb-2">
                {animal.species} {animal.breed ? `- ${animal.breed}` : ""}
              </p>
              <div className="flex space-x-2 mt-4">
                <Link
                  to={`/clients/${clientId}/animals/${animal.id}`}
                  className="p-2 rounded-lg bg-primary text-white transition-colors hover:bg-primary/80"
                >
                  <Eye className="h-5 w-5" />
                </Link>
                <Link
                  to={`/clients/${clientId}/animals/${animal.id}/edit`}
                  className="p-2 rounded-lg bg-secondary text-white transition-colors hover:bg-secondary/80"
                >
                  <Pen className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDelete(animal.id)}
                  className="p-2 rounded-lg bg-red-500 text-white transition-colors hover:bg-red-600"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
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
