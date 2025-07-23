import React from 'react';
import { useParams } from 'react-router-dom';
import AnimalDetailsLayout from '../../components/Animals/AnimalDetailsLayout';
import ConsultationHistory from '../../components/Animals/ConsultationHistory';
import ActionButtons from '../../components/Animals/ActionButtons';

const AnimalDetails = () => {
  const { clientId, animalId } = useParams();

  return (
    <AnimalDetailsLayout>
      {/* Duas colunas lado a lado */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <ConsultationHistory />
        <ActionButtons clientId={clientId} animalId={animalId} />
      </div>
    </AnimalDetailsLayout>
  );
};

export default AnimalDetails;
