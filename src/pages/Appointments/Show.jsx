import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointmentById } from "../../services/appoint";
import AnimalDetailsLayout from "../../components/Animals/AnimalDetailsLayout";
import AppointmentDetails from "../../components/Appointments/AppointmentDetails";

const ShowAppointment = () => {
  const { clientId, animalId, appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const data = await getAppointmentById(
          clientId,
          animalId,
          appointmentId,
        );
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
    return (
      <AnimalDetailsLayout>
        <div>Loading...</div>
      </AnimalDetailsLayout>
    );
  }

  if (error) {
    return (
      <AnimalDetailsLayout>
        <div>Error: {error}</div>
      </AnimalDetailsLayout>
    );
  }

  return (
    <AnimalDetailsLayout>
      <AppointmentDetails
        appointment={appointment}
        clientId={clientId}
        animalId={animalId}
      />
    </AnimalDetailsLayout>
  );
};

export default ShowAppointment;
