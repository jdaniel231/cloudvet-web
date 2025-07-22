import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createAnimalForClient } from '../../services/animal';
import { getClientById } from '../../services/client'; // Importar getClientById
import Modal from '../../components/common/Modal';

const NewAnimal = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    age: '',
    sex: '',
  });
  const [clientName, setClientName] = useState(''); // Novo estado para o nome do cliente
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalState, setModalState] = useState({
      show: false,
      title: '',
      message: '',
      type: 'success', // 'success' ou 'error'
    });

  useEffect(() => {
    const fetchClientName = async () => {
      try {
        const clientData = await getClientById(clientId);
        setClientName(clientData.name); // Assume que a resposta tem uma propriedade 'name'
      } catch (err) {
        console.error('Erro ao buscar nome do cliente:', err);
        setClientName('Cliente Desconhecido'); // Fallback
      }
    };

    if (clientId) {
      fetchClientName();
    }
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Basic validation
      if (!formData.name || !formData.species || !formData.age || !formData.sex) {
        throw new Error('Todos os campos são obrigatórios.');
      }

      await createAnimalForClient(clientId, formData);
      setModalState({
        show: true,
        title: 'Cadastro Realizado!',
        message: `Animal ${formData.name} cadastrado com sucesso!`, // Mensagem dinâmica
        type: 'success',
      });
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar animal.');
      console.error('Erro ao cadastrar animal:', err);
      setModalState({
        show: true,
        title: 'Erro no Cadastro!',
        message: err.response?.data?.error || 'Ocorreu um erro ao cadastrar o animal. Tente novamente.', // Mensagem de erro da API ou genérica
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === 'success') {
      navigate(`/clients/${clientId}`); // Redireciona apenas em caso de sucesso
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <nav className="text-sm text-gray-500 mb-4">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/clients" className="text-blue-600 hover:underline">Clientes</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link to={`/clients/${clientId}`} className="text-blue-600 hover:underline">
                {clientName}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <span>Novo Animal</span>
            </li>
          </ol>
        </nav>
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Cadastrar Novo Animal para {clientName}</h1> */}

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="species" className="block text-gray-700 text-sm font-bold mb-2">Espécie:</label>
              <select
                id="species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Selecione</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Idade:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="sex" className="block text-gray-700 text-sm font-bold mb-2">Sexo:</label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Selecione</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Animal'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/clients/${clientId}`)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Sucesso */}
      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  );
};

export default NewAnimal;