import React, { useState } from 'react';

const AnimalForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData.name || '');
  const [species, setSpecies] = useState(initialData.species || '');
  const [breed, setBreed] = useState(initialData.breed || '');
  const [age, setAge] = useState(initialData.age || '');
  const [sex, setSex] = useState(initialData.sex || '');
  const [castrated, setCastrated] = useState(initialData.castrated || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      species,
      breed,
      age: parseInt(age),
      sex,
      castrated,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-text text-sm font-bold mb-2">
          Nome do Animal:
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="species" className="block text-text text-sm font-bold mb-2">
          Espécie:
        </label>
        <input
          type="text"
          id="species"
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="breed" className="block text-text text-sm font-bold mb-2">
          Raça:
        </label>
        <input
          type="text"
          id="breed"
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="age" className="block text-text text-sm font-bold mb-2">
          Idade (anos):
        </label>
        <input
          type="number"
          id="age"
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="sex" className="block text-text text-sm font-bold mb-2">
          Sexo:
        </label>
        <select
          id="sex"
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        >
          <option value="">Selecione</option>
          <option value="Macho">Macho</option>
          <option value="Fêmea">Fêmea</option>
        </select>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="castrated"
          className="mr-2 h-4 w-4 text-primary focus:ring-primary border-border rounded"
          checked={castrated}
          onChange={(e) => setCastrated(e.target.checked)}
        />
        <label htmlFor="castrated" className="text-text text-sm font-bold">
          Castrado(a)
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Salvar Animal
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-lightText hover:bg-text text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AnimalForm;
