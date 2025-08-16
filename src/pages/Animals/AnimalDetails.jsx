import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnimalDetailsLayout from "../../components/Animals/AnimalDetailsLayout";
import ConsultationHistory from "../../components/Appointments/ConsultationHistory";
import ActionButtons from "../../components/Animals/ActionButtons";
import WeightHistory from "../../components/Weights/WeightHistory";
import { getWeights, createWeight } from "../../services/weight";
import Modal from "../../components/common/Modal";
import WeightsForm from "../../components/Weights/Form";
import VaccineHistory from "../../components/Vaccines/VaccineHistory";

const AnimalDetails = () => {
  const { clientId, animalId } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("consultations");
  const [weights, setWeights] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWeights = useCallback(async () => {
    try {
      const weightsData = await getWeights(clientId, animalId);
      setWeights(weightsData);
    } catch (error) {
      console.error("Failed to fetch weights:", error);
    }
  }, [clientId, animalId]);

  useEffect(() => {
    fetchWeights();
  }, [clientId, animalId, fetchWeights]);

  const handleAddWeight = async (formData) => {
    try {
      await createWeight(clientId, animalId, formData);
      fetchWeights(); // Re-fetch weights to update the list
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create weight:", error);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "consultations":
        return <ConsultationHistory />;
      case "weights":
        return (
          <WeightHistory weights={weights} onAdd={() => setIsModalOpen(true)} />
        );
      case "vaccines":
        return <VaccineHistory />;
      default:
        return <ConsultationHistory />;
    }
  };

  return (
    <AnimalDetailsLayout>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(`/clients/${clientId}`)}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Voltar
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>{renderContent()}</div>
        <ActionButtons onViewChange={setCurrentView} />
      </div>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <WeightsForm
          onSubmit={handleAddWeight}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </AnimalDetailsLayout>
  );
};

export default AnimalDetails;
