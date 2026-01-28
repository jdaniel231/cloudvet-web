import React from "react";
import { useParams } from "react-router-dom";
import useAnimalDetails from "../../hooks/useAnimalDetails";
import AnimalHeader from "./AnimalHeader";

const AnimalDetailsLayout = ({ children }) => {
  const { clientId, animalId } = useParams();
  const { animal, client, loading, error } = useAnimalDetails(
    clientId,
    animalId,
  );

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
    <div className="w-full p-6 mx-auto">
      <AnimalHeader client={client} animal={animal} />
      {React.Children.map(children, (child) => {
        // Se o filho for um componente (não uma string como 'div'), injetamos as props
        if (typeof child.type !== "string") {
          return React.cloneElement(child, { animal, client, clientId, animalId });
        }
        return child;
      })}
    </div>
  );
};

export default AnimalDetailsLayout;
