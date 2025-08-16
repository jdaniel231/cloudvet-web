import React from "react";
import { useNavigate } from "react-router-dom";

const AppointmentDetails = ({ appointment, clientId, animalId }) => {
  const navigate = useNavigate();

  if (!appointment) {
    return <div>Appointment not found.</div>;
  }

  return (
    <div className="bg-card shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-text">Detalhes da Consulta</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-bold">Queixa Principal:</p>
          <p>{appointment.chief_complaint}</p>
        </div>
        <div>
          <p className="font-bold">Histórico Médico:</p>
          <p>{appointment.medical_history}</p>
        </div>
        <div>
          <p className="font-bold">Diagnóstico Suspeito:</p>
          <p>{appointment.suspected_exams}</p>
        </div>
        <div>
          <p className="font-bold">Data:</p>
          <p>{new Date(appointment.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={() =>
            navigate(
              `/clients/${clientId}/animals/${animalId}/appointments/new`,
            )
          }
          className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Nova Consulta
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
