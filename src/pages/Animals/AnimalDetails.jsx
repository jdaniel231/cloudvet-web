import { Link, useParams, useNavigate } from 'react-router-dom';
import AnimalDetailsLayout from '../../components/Animals/AnimalDetailsLayout';
import ConsultationHistory from '../../components/Appointments/ConsultationHistory';
import ActionButtons from '../../components/Animals/ActionButtons';

const AnimalDetails = () => {
  const { clientId, animalId } = useParams();
  const navigate = useNavigate();
 
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
      {/* Duas colunas lado a lado */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <ConsultationHistory />
        <ActionButtons clientId={clientId} animalId={animalId} />
      </div>
    </AnimalDetailsLayout>
  );
};

export default AnimalDetails;
