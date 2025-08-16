import { useEffect, useState } from "react";
import { getAnimalById } from "../services/animal";
import { getClientById } from "../services/client";

const useAnimalDetails = (clientId, animalId) => {
  const [animal, setAnimal] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const animalData = await getAnimalById(clientId, animalId);
        setAnimal(animalData);
        const clientData = await getClientById(clientId);
        setClient(clientData);
      } catch (err) {
        setError("Erro ao carregar detalhes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (clientId && animalId) {
      fetchData();
    }
  }, [clientId, animalId]);

  return { animal, client, loading, error };
};

export default useAnimalDetails;
