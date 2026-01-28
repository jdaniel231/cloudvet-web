import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getClientById, getClientAnimals } from "../../services/client";
import ClientAnimalList from "../../components/Animals/ClientAnimalList";
import { User, Mail, Phone, Edit, Plus, PawPrint, Activity, Calendar } from "lucide-react";
import { getAnimalsByClient } from "../../services/animal";

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clientData = await getClientById(id);
        setClient(clientData);

        const animalsData = await getAnimalsByClient(id);
        setAnimals(animalsData);
      } catch (err) {
        setError("Erro ao carregar os dados do cliente e seus animais.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleAnimalDeleted = (animalId) => {
    setAnimals(animals.filter((animal) => animal.id !== animalId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="text-center">
          <div className="text-red-500 mb-2 font-bold text-xl">Ops!</div>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <p className="text-slate-500 text-lg">Cliente não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 md:p-8 space-y-8">
      {/* Hero Banner / Client Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-900 to-cyan-950 shadow-premium text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="relative z-10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
              <User className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">{client.name}</h1>
              <div className="flex flex-wrap gap-4 text-cyan-100 text-sm font-medium">
                <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {client.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {client.phone}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to={`/clients/${client.id}/edit`}
              className="flex items-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-300 font-medium text-sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Link>
            <Link
              to={`/clients/${client.id}/animals/new`}
              className="flex items-center px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 font-bold text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Animal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Animals List */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-cyan-600" />
            Meus Animais
          </h2>
        </div>

        <ClientAnimalList
          animals={animals}
          clientId={id}
          onAnimalDeleted={handleAnimalDeleted}
        />
      </div>
    </div>
  );
};

export default ClientDetails;
