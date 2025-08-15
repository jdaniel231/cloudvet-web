import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { deleteWeight, getWeights } from '../../services/weight';
import Modal from '../common/Modal';

const WeightHistory = ({ weights, onAdd }) => {

  const { clientId, animalId } = useParams();
  const [modalState, setModalState] = useState({ show: false, title: '', message: '', onConfirm: null });
  const [weight, setWeight] = useState(weights);

  useEffect(() => {
    setWeight(weights);
  }, [weights]);

  const handleDelete = async (weightId) => {
    setModalState({
      show: true,
      title: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir este peso?',
      onConfirm: async () => {
        try {
          await deleteWeight(clientId, animalId, weightId);
          const updatedWeights = await getWeights(clientId, animalId);
          setWeight(updatedWeights);
          setModalState({ show: false, title: '', message: '', onConfirm: null });
        } catch (error) {
          console.error('Erro ao excluir peso:', error);
          setModalState({ show: true, title: 'Erro!', message: 'Ocorreu um erro ao excluir o peso.', onConfirm: null });
        }
      },
    });
  };

  return (
    <div className="bg-card shadow-md rounded-2xl p-6">
       <Modal
        show={modalState.show}
        title={modalState.title}
        message={modalState.message}
        type='confirmation'
        onConfirm={modalState.onConfirm}
        onCancel={() => setModalState({ show: false, title: '', message: '', onConfirm: null })}
      />
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-text flex items-center">
          <FontAwesomeIcon icon={faWeight} className="text-primary mr-2" />
          Peso
        </h3>
        <button 
          className="ml-auto text-sm text-secondary hover:text-primary"
          onClick={onAdd}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
        {weight.length === 0 && (
          <p className="text-lightText italic">Nenhum peso registrado.</p>
        )}

        {weight.map((item, index) => (
          <div 
            key={index} 
            className="border border-border rounded-xl p-4 bg-background hover:bg-muted transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-base font-semibold text-text">
                  
                  {item.kg} kg
                </p>
                <p className="text-sm text-lightText">
                  {new Date(item.created_at).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-sm text-lightText">
                  {item.user?.email}
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
  );
};

export default WeightHistory;
