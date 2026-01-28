import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnimalById, updateAnimal } from "../../services/animal";
import AnimalForm from "../../components/Animals/Form";
import Modal from "../../components/common/Modal";

const EditAnimal = () => {
  const { clientId, animalId } = useParams();
  const [animal, setAnimal] = useState(null);
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalData = await getAnimalById(animalId);
        setAnimal(animalData);
      } catch (err) {
        console.error(err);
      }
    };

    if (clientId && animalId) {
      fetchData();
    }
  }, [clientId, animalId]);

  const handleSubmit = async (animalData) => {
    try {
      await updateAnimal(animalId, animalData);
      console.log("Animal atualizado com sucesso!");
      setModalState({
        show: true,
        title: "Atualização Realizada!",
        message: `Animal ${animalData.name} atualizado com sucesso!`,
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao atualizar animal:", error);
      setModalState({
        show: true,
        title: "Erro no Atualizar!",
        message:
          error.response?.data?.error ||
          "Ocorreu um erro ao atualizar o animal. Tente novamente.",
        type: "error",
      });
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === "success") {
      navigate(`/clients/${clientId}/animals/${animalId}`);
    }
  };

  const handleCancel = () => {
    navigate(`/clients/${clientId}/animals/${animalId}`);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">Editar Animal</h1>
        <div className="bg-card shadow-md rounded-lg p-6">
          {animal && (
            <AnimalForm
              clientId={clientId}
              initialData={animal}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isEditMode
            />
          )}{" "}
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
};

export default EditAnimal;
