import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faCat, faPaw } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimalById } from '../../services/animal';
import { getClientById } from '../../services/client';

const AnimalDetails = () => {
    const { clientId, animalId } = useParams();
    const [animal, setAnimal] = useState(null);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const animalData = await getAnimalById(clientId, animalId);
                setAnimal(animalData);
                const clientData = await getClientById(clientId);
                setClient(clientData);
            } catch (err) {
                setError('Erro ao carregar detalhes.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (clientId && animalId) {
            fetchData();
        }
    }, [clientId, animalId]);

    if (loading) {
      return (
        <>
            <div className="flex justify-center items-center h-screen">
            <p className="text-lg text-gray-700">Carregando detalhes...</p>
            </div>
        </>
      );
    }

    if (error) {
      return <div>Erro: {error}</div>;
    }

    if (!animal || !client) {
        return <div>Nenhum detalhe encontrado.</div>;
    }

    return (
      <div className='container mx-auto p-4'>
        <div className='bg-white shadow-md rounded-lg p-6 mb-6'>
          <div className='flex justify-between items-start mb-4'>
            {/* Informações do Cliente */}
            <div>
              <h2 className='text-2xl font-bold text-gray-800'> {client.name}</h2>
              <p className='text-sm text-gray-600'>{client.phone}</p>
            </div>

            {/* Nome do Animal e Outras Informações (centralizadas) */}
            <div className='flex flex-col'>
              <h1 className='text-3xl font-bold text-gray-800'>{animal.name}</h1>
              <div className=' mt-2'>
                <p className='text-sm text-gray-700 mb-1'>{animal.species}, {animal.age} anos</p>
                {/* <p className='text-sm text-gray-700 mb-1'> {animal.age}</p> */}
                <p className='text-sm text-gray-700 mb-1'>{animal.sex}, castrado</p>
              </div>
            </div>

            {/* Avatar do Animal (canto direito) */}
            <div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden'>
              {animal.species.toLowerCase() === 'cachorro' && <FontAwesomeIcon icon={faDog} size="4x" className="text-gray-700" />}
              {animal.species.toLowerCase() === 'gato' && <FontAwesomeIcon icon={faCat} size="4x" className="text-gray-700" />}
              {animal.species.toLowerCase() !== 'cachorro' && animal.species.toLowerCase() !== 'gato' && <FontAwesomeIcon icon={faPaw} size="4x" className="text-gray-700" />}
            </div>
            </div>
          </div>
        </div>
    );
};

export default AnimalDetails;