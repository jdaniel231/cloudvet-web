import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointmentById } from '../../services/appoint';
import AnimalDetailsLayout from '../../components/Animals/AnimalDetailsLayout';

const ShowAppointment = () => {
  const { clientId, animalId, appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const data = await getAppointmentById(clientId, animalId, appointmentId);
        setAppointment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [clientId, animalId, appointmentId]);

  if (loading) {
    return <AnimalDetailsLayout><div>Loading...</div></AnimalDetailsLayout>;
  }

  if (error) {
    return <AnimalDetailsLayout><div>Error: {error}</div></AnimalDetailsLayout>;
  }

  if (!appointment) {
    return <AnimalDetailsLayout><div>Appointment not found.</div></AnimalDetailsLayout>;
  }

  return (
    <AnimalDetailsLayout>
      <div className="bg-card shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text">Appointment Details</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/clients/${clientId}/animals/${animalId}/appointments/new`)}
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Nova Consulta
            </button>
            <button
              onClick={() => navigate(`/clients/${clientId}/animals/${animalId}`)}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Voltar
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Chief Complaint:</p>
            <p>{appointment.chief_complaint}</p>
          </div>
          <div>
            <p className="font-bold">Medical History:</p>
            <p>{appointment.medical_history}</p>
          </div>
          <div>
            <p className="font-bold">Suspected Diagnosis:</p>
            <p>{appointment.suspected_exams}</p>
          </div>
          <div>
            <p className="font-bold">Date:</p>
            <p>{new Date(appointment.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </AnimalDetailsLayout>
  );
};

export default ShowAppointment;