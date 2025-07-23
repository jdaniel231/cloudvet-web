import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getClients } from '../../services/client'; // ou getClients

export default function Clients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getClients();
        setClients(data || []);
      } catch (err) {
        console.error('Erro ao carregar clientes:', err);
        setErrorMsg('Não foi possível carregar os clientes.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Normaliza os nomes dos animais independente do formato
  const getAnimalNames = (client) => {
    if (!client || !client.animals) return [];
    return client.animals.map(animal => ({
      id: animal.id || animal.animal_id,
      name: animal.name
    }));
  };

    const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // You can change this value

  const filteredClients = Array.isArray(clients)
    ? clients.filter((client) => {
        const term = searchTerm.toLowerCase();
        const nameMatch = client.name?.toLowerCase().includes(term);
        const animalMatch = getAnimalNames(client).some((a) =>
          a.name.toLowerCase().includes(term)
        );
        return nameMatch || animalMatch;
      })
    : [];

  // Pagination logic
  const indexOfLastClient = currentPage * itemsPerPage;
  const indexOfFirstClient = indexOfLastClient - itemsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <nav className="text-sm text-lightText mb-4">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <span>Clientes</span>
          </li>
        </ol>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text">Lista de Clientes</h1>
        <div className="flex space-x-4">
          <button
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
            onClick={() => navigate('/clients/new')}
          >
            Novo Cliente
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Pesquisar clientes ou animais..."
          className="w-full sm:w-2/3 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-lightText">Itens por página:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when items per page changes
            }}
            className="p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
            disabled={loading}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="bg-card shadow-md rounded-lg p-6 min-h-[120px]">
        {loading && <p className="text-lightText italic">Carregando...</p>}

        {!loading && errorMsg && (
          <p className="text-red-500">{errorMsg}</p>
        )}

        {!loading && !errorMsg && filteredClients.length === 0 && (
          <p className="text-lightText">Nenhum cliente encontrado.</p>
        )}

        {!loading && !errorMsg && filteredClients.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-card">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-border bg-background text-left text-xs font-semibold text-lightText uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="py-2 px-4 border-b border-border bg-background text-left text-xs font-semibold text-lightText uppercase tracking-wider">
                      Animais
                    </th>
                    <th className="py-2 px-4 border-b border-border bg-background"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentClients.map((client) => {
                    const animals = getAnimalNames(client);
                    return (
                      <tr key={client.id} className="hover:bg-background">
                        <td className="py-3 px-4 whitespace-nowrap">
                          <p className="text-lg font-semibold text-text">
                            {client.name}
                          </p>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {animals.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {animals.map((animal, index) => (
                                <Link
                                  key={animal.id || index}
                                  to={`/clients/${client.id}/animals/${animal.id}`}
                                  className="bg-primary-light text-primary-dark text-xs font-medium px-2.5 py-0.5 rounded-full hover:underline"
                                >
                                  {animal.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/clients/${client.id}`}
                            className="bg-secondary hover:bg-secondary-dark text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 mr-2"
                          >
                            Ver Detalhes
                          </Link>
                          <button
                            className="bg-primary hover:bg-primary-dark text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300"
                            onClick={() =>
                              alert(
                                `Iniciar atendimento para ${client.name}`
                              )
                            }
                          >
                            Atender
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-border rounded-lg text-lightText bg-card hover:bg-background disabled:opacity-50"
                >
                  Anterior
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`px-4 py-2 border border-border rounded-lg ${
                      currentPage === number + 1
                        ? "bg-primary text-white"
                        : "text-lightText bg-card hover:bg-background"
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-border rounded-lg text-lightText bg-card hover:bg-background disabled:opacity-50"
                >
                  Próximo
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
