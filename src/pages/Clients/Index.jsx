import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getClients } from "../../services/client";
import {
  Users,
  Plus,
  Search,
  Eye,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Dog,
  Cat,
  PawPrint
} from "lucide-react";
import DataTable from "../../components/common/DataTable";

export default function Clients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getClients();
        setClients(data || []);
      } catch (err) {
        console.error("Erro ao carregar clientes:", err);
        setErrorMsg("Não foi possível carregar os clientes.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getAnimalNames = (client) => {
    if (!client || !Array.isArray(client.animals)) return [];

    return client.animals
      .filter(
        (animal) => animal && (animal.name || animal.animal_id || animal.id),
      )
      .map((animal) => ({
        id: animal.id || animal.animal_id || null,
        name: animal.name || "Sem nome",
        species: animal.species || ""
      }));
  };

  const filteredClients = Array.isArray(clients)
    ? clients.filter((client) => {
      const term = searchTerm.toLowerCase();
      const nameMatch = client.name?.toLowerCase().includes(term);
      const animalMatch = getAnimalNames(client).some((a) =>
        a.name.toLowerCase().includes(term),
      );
      return nameMatch || animalMatch;
    })
    : [];

  const indexOfLastClient = currentPage * itemsPerPage;
  const indexOfFirstClient = indexOfLastClient - itemsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient,
  );
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Helper to get initials
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Helper to get animal style
  const getAnimalStyle = (species) => {
    const s = species?.toLowerCase();
    if (s === 'cachorro' || s === 'dog' || s === 'canino') {
      return {
        bg: "bg-cyan-50",
        text: "text-cyan-700",
        border: "border-cyan-100",
        hoverBg: "hover:bg-cyan-100",
        icon: Dog
      };
    } else if (s === 'gato' || s === 'cat' || s === 'felino') {
      return {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-100",
        hoverBg: "hover:bg-purple-100",
        icon: Cat
      };
    }
    return {
      bg: "bg-slate-100",
      text: "text-slate-600",
      border: "border-slate-200",
      hoverBg: "hover:bg-slate-200",
      icon: PawPrint
    };
  };

  const columns = [
    {
      header: "Cliente",
      key: "name",
      render: (client) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-sm border border-indigo-100/50">
            {getInitials(client.name)}
          </div>
          <div>
            <h3 className="font-bold text-slate-700 text-sm group-hover:text-indigo-700 transition-colors">
              {client.name}
            </h3>
            <p className="text-xs text-slate-400">
              {client.contact || "Sem contato"}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Animais Associados",
      key: "animals",
      render: (client) => {
        const animals = getAnimalNames(client);
        return animals.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {animals.map((animal, index) => {
              const style = getAnimalStyle(animal.species);
              const Icon = style.icon;

              return animal.id ? (
                <Link
                  key={animal.id}
                  to={`/clients/${client.id}/animals/${animal.id}`}
                  className={`flex items-center gap-1.5 px-3 py-1 ${style.bg} ${style.hoverBg} ${style.text} hover:text-opacity-80 text-xs font-semibold rounded-full transition-colors border ${style.border}`}
                >
                  <Icon className="h-3 w-3" />
                  {animal.name}
                </Link>
              ) : (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-full"
                >
                  {animal.name}
                </span>
              );
            })}
          </div>
        ) : (
          <span className="text-slate-400 text-xs italic">
            Nenhum animal cadastrado
          </span>
        );
      },
    },
    {
      header: "Ações",
      align: "right",
      render: (client) => (
        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/clients/${client.id}`}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="Ver Detalhes"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <button
            onClick={() => alert(`Iniciar atendimento para ${client.name}`)}
            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
            title="Iniciar Atendimento"
          >
            <Stethoscope className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 text-white">
              <Users className="h-6 w-6" />
            </div>
            Gestão de Clientes
          </h1>
          <p className="text-slate-500 text-sm mt-1 ml-14">
            Gerencie proprietários e seus animais
          </p>
        </div>

        <button
          className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          onClick={() => navigate("/clients/new")}
        >
          <Plus className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
          <span className="font-semibold text-sm">Novo Cliente</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou animal..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 text-sm placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex items-center gap-3 pl-4 sm:border-l border-slate-100">
          <label htmlFor="itemsPerPage" className="text-sm font-medium text-slate-500 whitespace-nowrap">
            Exibir:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="py-2.5 pl-3 pr-8 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-semibold text-slate-700 cursor-pointer outline-none"
            disabled={loading}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[400px] flex flex-col">
        <DataTable
          columns={columns}
          data={currentClients}
          loading={loading}
          errorMsg={errorMsg}
          searchTerm={searchTerm}
          emptyMessage="Nenhum cliente encontrado"
          emptyIcon={Users}
        />

        {!loading && !errorMsg && filteredClients.length > 0 && totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="text-xs text-slate-400 font-medium">
              Mostrando <span className="text-slate-700">{indexOfFirstClient + 1}</span> - <span className="text-slate-700">{Math.min(indexOfLastClient, filteredClients.length)}</span> de <span className="text-slate-700">{filteredClients.length}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {[...Array(totalPages).keys()].map((number) => {
                const page = number + 1;
                return (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`
                        w-8 h-8 rounded-lg text-xs font-bold transition-all
                        ${currentPage === page
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                        : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                      }
                      `}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
