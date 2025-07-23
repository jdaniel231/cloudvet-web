import React from 'react';
import { useParams } from 'react-router-dom';
import useAnimalDetails from '../../hooks/useAnimalDetails';
import AnimalHeader from './AnimalHeader';

const AnimalDetailsLayout = ({ children }) => {
  const { clientId, animalId } = useParams();
  const { animal, client, loading, error } = useAnimalDetails(clientId, animalId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-700">Carregando detalhes...</p>
      </div>
    );
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!animal || !client) {
    return <div>Nenhum detalhe encontrado.</div>;
  }

  return (
    <div className='container mx-auto p-4 '>
      <AnimalHeader client={client} animal={animal} />
      {React.Children.map(children, child =>
        React.cloneElement(child, { animal, client, clientId, animalId })
      )}
    </div>
  );
};

export default AnimalDetailsLayout;
