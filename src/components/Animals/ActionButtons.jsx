import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faWeight, faSyringe, faFile, faPrescriptionBottle, faRedo, faPaw, faClinicMedical } from '@fortawesome/free-solid-svg-icons';

const ActionButtons = ({ onViewChange }) => {

  const buttons = [
    { 
      label: "Consultas", 
      view: "consultations",
      color: "bg-primary hover:bg-primary-dark", 
      icon: faClinicMedical, 
    },
    { 
      label: "Pesos", 
      view: "weights",
      color: "bg-secondary hover:bg-secondary-dark", 
      icon: faWeight,
    },
    { 
      label: "Vacinas", 
      view: "vaccines",
      color: "bg-primary hover:bg-primary-dark", 
      icon: faSyringe 
    },
    { 
      label: "Anexos", 
      view: "attachments",
      color: "bg-accent hover:bg-accent-dark", 
      icon: faFile 
    },
    { 
      label: "Receitas", 
      view: "prescriptions",
      color: "bg-secondary hover:bg-secondary-dark", 
      icon: faPrescriptionBottle 
    },
    { 
      label: "Agendar Retorno", 
      view: "scheduleReturn",
      color: "bg-primary hover:bg-primary-dark", 
      icon: faRedo 
    },
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
            onClick={() => onViewChange(btn.view)}
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