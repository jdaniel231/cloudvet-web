import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const ConsultationHistory = () => {
  // Simulação de consultas - ideally this would come from props or a data fetch
  const consultations = [
    { date: "15/07/2025", doctor: "Dr. Carlos Silva", desc: "Consulta de rotina" },
    { date: "20/06/2025", doctor: "Dra. Ana Santos", desc: "Vacinação" },
    { date: "10/05/2025", doctor: "Dr. Pedro Lima", desc: "Exame de sangue" },
    { date: "25/03/2025", doctor: "Dr. Carlos Silva", desc: "Castração" },
  ];

  return (
    <div className='bg-card shadow-md rounded-lg p-6'>
      <h3 className='text-xl font-bold text-text mb-4 flex items-center'>
        <FontAwesomeIcon icon={faCalendar} className="text-primary mr-2" />
        Histórico de Consultas
      </h3>
      <div className='space-y-4 max-h-96 overflow-y-auto'>
        {consultations.map((item, idx) => (
          <div key={idx} className='border border-border rounded-lg p-4 hover:bg-background transition-colors'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='font-semibold text-text'>{item.date}</p>
                    <p className='text-sm text-lightText'>{item.doctor}</p>
                    <p className='text-sm text-lightText mt-1'>{item.desc}</p>
                  </div>
                  <button className='bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded-md text-sm transition-colors'>
                Visualizar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationHistory;
