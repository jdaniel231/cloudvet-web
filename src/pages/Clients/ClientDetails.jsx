import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getClientById, getClientAnimals } from '../../services/client';
import ClientAnimalList from '../../components/Animals/ClientAnimalList';

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clientData = await getClientById(id);
        setClient(clientData);

        const animalsData = await getClientAnimals(id);
        setAnimals(animalsData);
      } catch (err) {
        setError('Erro ao carregar os dados do cliente e seus animais.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleAnimalDeleted = (animalId) => {
    setAnimals(animals.filter((animal) => animal.id !== animalId));
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-lightText">Carregando detalhes do cliente...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      </>
    );
  }

  if (!client) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-lightText">Cliente não encontrado.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">{client.name}</h1>

        <div className="bg-card shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-text mb-4">Informações do Cliente</h2>
          <p className="text-text mb-2"><span className="font-medium">Nome:</span> {client.name}</p>
          <p className="text-text mb-2"><span className="font-medium">Email:</span> {client.email}</p>
          <p className="text-text mb-2"><span className="font-medium">Telefone:</span> {client.phone}</p>
          {/* Adicione mais detalhes do cliente conforme necessário */}

          <div className="flex justify-end">
            <Link
              to={`/clients/${client.id}/edit`}
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              Editar
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-text mb-4">Animais do Cliente</h2>
        <ClientAnimalList animals={animals} clientId={id} onAnimalDeleted={handleAnimalDeleted} />
      </div>
    </>
  );
};

export default ClientDetails;