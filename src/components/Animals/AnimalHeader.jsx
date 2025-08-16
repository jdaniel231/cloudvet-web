import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faCat, faPaw } from "@fortawesome/free-solid-svg-icons";

const AnimalHeader = ({ client, animal }) => {
  return (
    <div className="bg-card shadow-md rounded-lg p-6 mb-6 ">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Informações do Cliente */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-text">{client.name}</h2>
          <p className="text-sm text-lightText">{client.phone}</p>
        </div>

        {/* Nome do Animal */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text mb-1">{animal.name}</h1>
          <p className="text-sm text-lightText">
            {animal.species}, {animal.age} anos
          </p>
          <p className="text-sm text-lightText">
            {animal.sex}, {animal.castrated ? "castrado" : "não castrado"}
          </p>
        </div>

        {/* Avatar do Animal */}
        <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center">
          {animal.species.toLowerCase() === "cachorro" && (
            <FontAwesomeIcon icon={faDog} size="3x" className="text-primary" />
          )}
          {animal.species.toLowerCase() === "gato" && (
            <FontAwesomeIcon icon={faCat} size="3x" className="text-primary" />
          )}
          {animal.species.toLowerCase() !== "cachorro" &&
            animal.species.toLowerCase() !== "gato" && (
              <FontAwesomeIcon
                icon={faPaw}
                size="3x"
                className="text-primary"
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default AnimalHeader;
