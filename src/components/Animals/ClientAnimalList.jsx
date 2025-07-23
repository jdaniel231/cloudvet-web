import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Importar Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDog,
  faCat,
  faPaw, // Mantendo o faPaw como default
} from '@fortawesome/free-solid-svg-icons';

// Mapeamento de espécies para ícones do Font Awesome
const speciesIcons = {
  cachorro: faDog,
  cão: faDog,
  gato: faCat,
  default: faPaw, // Ícone padrão para espécies não mapeadas
};

const ClientAnimalList = ({ animals, clientId }) => {
  if (!animals || animals.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-lightText mb-4">Nenhum animal encontrado para este cliente.</p>
        <Link
          to={`/clients/${clientId}/animals/new`}
          className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Adicionar Animal
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link
          to={`/clients/${clientId}/animals/new`}
          className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Adicionar Animal
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="bg-card rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="p-4 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mb-3 border-2 border-border text-4xl text-primary">
                <FontAwesomeIcon icon={speciesIcons[animal.species?.toLowerCase()] || speciesIcons.default} />
              </div>
              <h3 className="text-xl font-semibold text-text mb-1">{animal.name}</h3>
              <p className="text-sm text-lightText mb-2">
                {animal.species} {animal.breed ? `- ${animal.breed}` : ''}
              </p>
              {/* Exemplo de botão de ação - você pode adicionar mais ou remover */}
              <Link
                to={`/clients/${clientId}/animals/${animal.id}`}
                className="inline-block bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

ClientAnimalList.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      breed: PropTypes.string,
      // Adicione outras props do animal conforme sua API retornar
    })
  ).isRequired,
  clientId: PropTypes.string.isRequired, // Adicionar clientId como prop obrigatória
};

export default ClientAnimalList;