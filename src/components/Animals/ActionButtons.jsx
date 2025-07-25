import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faWeight, faSyringe, faFile, faHeartbeat, faPrescriptionBottle, faRedo, faPaw } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ActionButtons = ({ clientId, animalId }) => {
  const navigate = useNavigate();

  const buttons = [
    { 
      label: "Nova Consulta", 
      color: "bg-primary hover:bg-primary-dark", 
      icon: faCalendar, 
      action: () => navigate(`/clients/${clientId}/animals/${animalId}/appointments/new`)
    },
    { label: "Registrar Peso", color: "bg-secondary hover:bg-secondary-dark", icon: faWeight },
    { label: "Registrar Vacinas", color: "bg-primary hover:bg-primary-dark", icon: faSyringe },
    { label: "Anexos", color: "bg-accent hover:bg-accent-dark", icon: faFile },
    { label: "Receitas", color: "bg-secondary hover:bg-secondary-dark", icon: faPrescriptionBottle },
    { label: "Agendar Retorno", color: "bg-primary hover:bg-primary-dark", icon: faRedo },
  ];

  return (
    <div className='bg-card shadow-md rounded-lg p-6'>
      <h3 className='text-xl font-bold text-text mb-4 flex items-center'>
        <FontAwesomeIcon icon={faPaw} className="text-secondary mr-2" />
        Ações e Registros
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            className={`${btn.color} text-white p-4 rounded-lg flex items-center justify-center transition-colors shadow-md hover:shadow-lg`}
            onClick={btn.action}
          >
            <FontAwesomeIcon icon={btn.icon} className="mr-2" />
            <span className='font-semibold'>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;