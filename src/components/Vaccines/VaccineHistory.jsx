import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteVaccine, getVaccines } from "../../services/vaccine";
import Modal from "../common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSyringe, faTrash } from '@fortawesome/free-solid-svg-icons';

const VaccineHistory = () => {
  const { clientId, animalId } = useParams();
  const [vaccines, setVaccines] = useState([]);
  const [modalState, setModalState] = useState({ show: false, title: '', message: '', onConfirm: null });
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const fetchVaccines = async () => {
    try {
      const vaccinesData = await getVaccines(clientId, animalId);
      setVaccines(vaccinesData);
    } catch (error) {
      setError('Erro ao carregar o histórico de vacinas.');
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchVaccines();
  }, [clientId, animalId]);


  const handleDelete = async (vaccineId) => {
    setModalState({
      show: true,
      title: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir esta vacina?',
      onConfirm: async () => {
        try {
          await deleteVaccine(clientId, animalId, vaccineId);
          fetchVaccines(); // Re-fetch vaccines after deletion
          setModalState({ show: false, title: '', message: '', onConfirm: null });
        } catch (error) {
          console.error('Erro ao excluir vacina:', error);
          setModalState({ show: true, title: 'Erro!', message: 'Ocorreu um erro ao excluir a vacina.', onConfirm: null });
        }
      },
    });
  };

  return (
    <div className="bg-card shadow-md rounded-lg p-6">
      <Modal
        show={modalState.show}
        title={modalState.title}
        message={modalState.message}
        type={modalState.onConfirm ? 'confirmation' : 'error'}
        onConfirm={modalState.onConfirm}
        onCancel={() => setModalState({ show: false, title: '', message: '', onConfirm: null }) }
      />
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-text flex items-center">
          <FontAwesomeIcon icon={faSyringe} className="text-primary mr-2" />
          Vacinas
        </h3>
        <button 
          className="ml-auto text-sm text-secondary hover:text-primary"
          onClick={() => navigate(`/clients/${clientId}/animals/${animalId}/vaccines/new`)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
        {vaccines.length === 0 && (
          <p className="text-lightText italic">Nenhuma vacina registrada.</p>
        )}

        {vaccines.map((item) => (
          <div 
            key={item.id} 
            className="border border-border rounded-xl p-4 bg-background hover:bg-muted transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-base font-semibold text-text">
                  
                  {item.vaccine_type?.name}
                </p>
                <p className="text-sm text-lightText">
                  Aplicado em: {new Date(item.application_date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                </p>
                <p className="text-sm text-lightText">
                  Retonar em: {new Date(item.return_date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                </p>
                <p className="text-sm text-lightText">
                  Veterinário: {item.user?.name}
                </p>
              </div>
              <button 
                onClick={() => handleDelete(item.id)}
                className="bg-accent hover:bg-accent-dark text-white px-3 py-1 rounded-md text-sm transition-colors"
                title="Remover"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VaccineHistory;