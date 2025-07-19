import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '../../services/client';
import Modal from '../../components/common/Modal'; // Importa o componente Modal

export default function NewClient() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [phone, setPhone] = useState(''); // Adicionado
  const [address, setAddress] = useState('');
  const [number_address, setNumberAddress] = useState(''); // Renomeado
  const [compl_address, setComplAddress] = useState(''); // Renomeado
  const [neighborhoods, setNeighborhoods] = useState(''); // Renomeado
  const [modalState, setModalState] = useState({
    show: false,
    title: '',
    message: '',
    type: 'success', // 'success' ou 'error'
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = {
      name,
      cpf,
      rg,
      phone, // Adicionado
      address,
      number_address, // Renomeado
      compl_address, // Renomeado
      neighborhoods // Renomeado
    };
    try {
      const newClient = await createClient(client);
      console.log('Novo Cliente:', newClient);
      setModalState({
        show: true,
        title: 'Cadastro Realizado!',
        message: `Cliente ${name} cadastrado com sucesso!`, // Mensagem dinâmica
        type: 'success',
      });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      setModalState({
        show: true,
        title: 'Erro no Cadastro!',
        message: error.response?.data?.error || 'Ocorreu um erro ao cadastrar o cliente. Tente novamente.', // Mensagem de erro da API ou genérica
        type: 'error',
      });
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === 'success') {
      navigate('/clients'); // Redireciona apenas em caso de sucesso
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
              <span>Novo Cliente</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold mb-6">Novo Cliente</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Nome do Cliente:
                </label>
                <input
                  type="text"
                  id="clientName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <label htmlFor="cpf" className="block text-gray-700 text-sm font-bold mb-2">
                    CPF:
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label htmlFor="rg" className="block text-gray-700 text-sm font-bold mb-2">
                    RG:
                  </label>
                  <input
                    type="text"
                    id="rg"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Telefone:
              </label>
              <input
                type="text"
                id="phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                    Endereço:
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label htmlFor="number_address" className="block text-gray-700 text-sm font-bold mb-2">
                    Número:
                  </label>
                  <input
                    type="text"
                    id="number_address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={number_address}
                    onChange={(e) => setNumberAddress(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label htmlFor="compl_address" className="block text-gray-700 text-sm font-bold mb-2">
                    Complemento:
                  </label>
                  <input
                    type="text"
                    id="compl_address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={compl_address}
                    onChange={(e) => setComplAddress(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label htmlFor="neighborhoods" className="block text-gray-700 text-sm font-bold mb-2">
                    Bairro:
                  </label>
                  <input
                    type="text"
                    id="neighborhoods"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={neighborhoods}
                    onChange={(e) => setNeighborhoods(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cadastrar Cliente
              </button>
              <button
                type="button"
                onClick={() => navigate('/clients')}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Sucesso/Erro */}
      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  );
}