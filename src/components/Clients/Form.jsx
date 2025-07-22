import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientForm({ initialData = {}, onSubmit, isEditMode = false }) {
  const [name, setName] = useState(initialData.name || '');
  const [cpf, setCpf] = useState(initialData.cpf || '');
  const [rg, setRg] = useState(initialData.rg || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [address, setAddress] = useState(initialData.address || '');
  const [number_address, setNumberAddress] = useState(initialData.number_address || '');
  const [compl_address, setComplAddress] = useState(initialData.compl_address || '');
  const [neighborhoods, setNeighborhoods] = useState(initialData.neighborhoods || '');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      cpf,
      rg,
      phone,
      address,
      number_address,
      compl_address,
      neighborhoods,
    });
  };

  return (
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

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditMode ? 'Atualizar' : 'Cadastrar'}
        </button>
        <button
          type="button"
          onClick={() => navigate(isEditMode ? `/clients/${initialData.id}` : '/clients')}
          className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}