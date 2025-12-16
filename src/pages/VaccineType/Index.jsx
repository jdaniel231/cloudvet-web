import { useEffect, useState } from "react";
import { deleteVaccineType, getVaccineTypes } from "../../services/vaccineType";
import { Link } from "react-router-dom";
import {
  Pen,
  Trash2,
  Search,
  Plus,
  Syringe,
  FlaskConical,
  AlertCircle
} from "lucide-react";
import Modal from "../../components/common/Modal";

export default function Index() {
  const [vaccineTypes, setVaccineTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Search state

  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
    onConfirm: null,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedVaccineType, setSelectedVaccineType] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getVaccineTypes();
        setVaccineTypes(data || []);
      } catch (err) {
        console.error("Erro ao carregar tipos de vacina:", err);
        setErrorMsg("Não foi possível carregar os tipos de vacina.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCloseModal = () => {
    setModalState({
      show: false,
      title: "",
      message: "",
      type: "success",
      onConfirm: null,
    });
  };

  const handleDelete = (vaccineType) => {
    setSelectedVaccineType(vaccineType);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedVaccineType) return;

    setShowConfirmModal(false);
    try {
      await deleteVaccineType(selectedVaccineType.id);

      setVaccineTypes((prev) =>
        prev.filter((v) => v.id !== selectedVaccineType.id),
      );

      setModalState({
        show: true,
        title: "Exclusão Realizada!",
        message: `Tipo de vacina "${selectedVaccineType.name}" excluído com sucesso!`,
        type: "success",
        onConfirm: null,
      });

      setSelectedVaccineType(null);
    } catch (error) {
      console.error("Erro ao excluir tipo de vacina:", error);
      setModalState({
        show: true,
        title: "Erro ao Excluir!",
        message:
          error.response?.data?.error ||
          "Ocorreu um erro ao excluir o tipo de vacina. Tente novamente.",
        type: "error",
        onConfirm: null,
      });
    }
  };

  // Filter logic
  const filteredTypes = vaccineTypes.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8 min-h-screen bg-slate-50/50">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Gerenciamento de Vacinas
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Configure e gerencie os tipos de vacinas disponíveis no sistema
          </p>
        </div>

        <Link
          to="/vaccine_types/new"
          className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <div className="bg-white/10 p-1 rounded-lg group-hover:bg-white/20 transition-colors">
            <Plus className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300" />
          </div>
          <span className="font-semibold text-sm">Novo Tipo</span>
        </Link>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden backdrop-blur-xl">

        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Buscar tipo de vacina..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 w-full bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all shadow-sm text-slate-600 font-medium placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <FlaskConical className="h-4 w-4 text-slate-400" />
            <span>{filteredTypes.length} Registros</span>
          </div>
        </div>

        {/* Table Content */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-600"></div>
                <p className="text-slate-500 font-medium animate-pulse">Carregando dados...</p>
              </div>
            </div>
          ) : errorMsg ? (
            <div className="flex flex-col items-center justify-center h-64 text-red-500 bg-red-50/50 m-4 rounded-2xl border border-red-100">
              <AlertCircle className="h-10 w-10 mb-3" />
              <p className="font-semibold">{errorMsg}</p>
            </div>
          ) : filteredTypes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <Syringe className="h-12 w-12 text-slate-300" />
              </div>
              <p className="text-lg font-medium text-slate-600">Nenhum registro encontrado</p>
              <p className="text-sm text-slate-400 mt-1">
                {searchTerm ? "Tente buscar por outro termo" : "Comece adicionando um novo tipo de vacina"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="py-5 px-8 text-left text-xs font-bold text-slate-400 uppercase tracking-wider w-20">
                      Item
                    </th>
                    <th className="py-5 px-6 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Nome da Vacina
                    </th>
                    <th className="py-5 px-6 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Gerenciar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredTypes.map((type) => (
                    <tr
                      key={type.id}
                      className="group hover:bg-slate-50/80 transition-colors duration-200"
                    >
                      <td className="py-4 px-8">
                        <div className="bg-cyan-50 p-2.5 rounded-xl w-fit group-hover:bg-cyan-100 group-hover:scale-110 transition-all duration-300">
                          <Syringe className="h-5 w-5 text-cyan-600" />
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-700 text-lg">{type.name}</p>
                        {/* If we had description, it would go here */}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end items-center gap-3">
                          <Link
                            to={`/vaccine_types/${type.id}/edit`}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group/edit"
                            title="Editar"
                          >
                            <Pen className="h-5 w-5 group-hover/edit:scale-110 transition-transform" />
                          </Link>

                          <button
                            onClick={() => handleDelete(type)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200 group/delete"
                            title="Excluir"
                          >
                            <Trash2 className="h-5 w-5 group-hover/delete:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de feedback */}
      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        onConfirm={modalState.onConfirm}
      />

      {/* Modal de confirmação */}
      <Modal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o tipo de vacina "${selectedVaccineType?.name}"? Esta ação não pode ser desfeita.`}
        type="confirmation"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
