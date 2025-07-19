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
    if (!client) return [];
    const raw = client.animals;
    if (!raw) return [];
    if (Array.isArray(raw) && raw.length > 0) {
      // Se já for array de strings
      if (typeof raw[0] === 'string') return raw;
      // Se for array de objetos {name: "..."}
      return raw.map((a) => a?.name).filter(Boolean);
    }
    return [];
  };

    const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // You can change this value

  const filteredClients = Array.isArray(clients)
    ? clients.filter((client) => {
        const term = searchTerm.toLowerCase();
        const nameMatch = client.name?.toLowerCase().includes(term);
        const animalMatch = getAnimalNames(client).some((n) =>
          n.toLowerCase().includes(term)
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
      <nav className="text-sm text-gray-500 mb-4">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <span>Clientes</span>
          </li>
        </ol>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lista de Clientes</h1>
        <div className="flex space-x-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
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
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-gray-700">Itens por página:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when items per page changes
            }}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 min-h-[120px]">
        {loading && <p className="text-gray-500 italic">Carregando...</p>}

        {!loading && errorMsg && (
          <p className="text-red-600">{errorMsg}</p>
        )}

        {!loading && !errorMsg && filteredClients.length === 0 && (
          <p className="text-gray-600">Nenhum cliente encontrado.</p>
        )}

        {!loading && !errorMsg && filteredClients.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Animais
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentClients.map((client) => {
                    const animals = getAnimalNames(client);
                    return (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 whitespace-nowrap">
                          <p className="text-lg font-semibold text-gray-800">
                            {client.name}
                          </p>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {animals.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {animals.map((animal, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                                >
                                  {animal}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300"
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
                  className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Anterior
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`px-4 py-2 border rounded-lg ${
                      currentPage === number + 1
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
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
