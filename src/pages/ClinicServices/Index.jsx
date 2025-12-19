import {  useEffect, useState } from "react";
import { deleteClinicService, getClinicServices } from "../../services/clinicService";
import Modal from "../../components/common/Modal";
import { Link } from "react-router-dom";
import { AlertCircle, HospitalIcon, Pen, Plus, Search, Trash2 } from "lucide-react";

export default function ClinicServicesIndex() {
  const [clinicServices, setClinicServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
    onConfirm: null,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedClinicService, setSelectedClinicService] = useState(null);


  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getClinicServices();
        // Garante que os valores monetários sejam números para evitar erros com .toFixed()
        const servicesWithNumericValues = (data || []).map(service => ({
          ...service,
          cost_value: parseFloat(service.cost_value) || 0,
          total_value: parseFloat(service.total_value) || 0,
        }));
        setClinicServices(servicesWithNumericValues);
        setLoading(false);
      } catch (error) {
        setErrorMsg("Nao foi possivel carregar os serviços da clínica.");
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (modalState.show && modalState.type === "success") {
      const timer = setTimeout(() => {
        setModalState({
          show: false,
          title: "",
          message: "",
          type: "success",
          onConfirm: null,
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modalState.show, modalState.type]);

  const handleCloseModal = () => {
    setModalState({
      show: false,
      title: "",
      message: "",
      type: "success",
      onConfirm: null,
    });
  };

  const handleDelete = (clinicService) => {
    setSelectedClinicService(clinicService);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedClinicService) return;

    setShowConfirmModal(false);
    try {
      await deleteClinicService(selectedClinicService.id);

      setClinicServices((prev) =>
        prev.filter((v) => v.id !== selectedClinicService.id),
      );

      setModalState({
        show: true,
        title: "Exclusão Realizada!",
        message: `Serviço da clínica "${selectedClinicService.name}" excluído com sucesso!`,
        type: "success",
        onConfirm: null,
      });

      setSelectedClinicService(null);
    } catch (error) {
      console.error("Erro ao excluir serviço da clínica:", error);
      setModalState({
        show: true,
        title: "Erro ao Excluir!",
        message:
          error.response?.data?.error ||
          "Ocorreu um erro ao excluir o serviço da clínica. Tente novamente.",
        type: "error",
        onConfirm: null,
      });
    }
  };

  const filteredTypes = clinicServices.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8 min-h-screen bg-slate-50/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Serviços de Clínica
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Configure e gerencie os serviços de clínica disponíveis no sistema
          </p>
        </div>

        <Link
          to="/clinic_services/new"
          className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <div className="bg-white/10 p-1 rounded-lg group-hover:bg-white/20 transition-colors">
            <Plus className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300" />
          </div>
          <span className="font-semibold text-sm">Novo Serviço</span>
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
              placeholder="Buscar serviço de clínica..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 w-full bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all shadow-sm text-slate-600 font-medium placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <HospitalIcon className="h-4 w-4 text-slate-400" />
            <span>{filteredTypes.length} Serviços</span>
          </div>
        </div>
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-600"></div>
                <p className="text-slate-500 font-medium animate-pulse">Carregando dados...</p>
              </div>
            </div>
          ) : errorMsg ? ( // Erro na API
            <div className="flex flex-col items-center justify-center h-64 text-red-500 bg-red-50/50 m-4 rounded-2xl border border-red-100">
              <AlertCircle className="h-10 w-10 mb-3" />
              <p className="font-semibold">{errorMsg}</p>
            </div>
          ) : filteredTypes.length === 0 ? ( // Nenhum resultado
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                <div className="bg-slate-100 p-6 rounded-full mb-4">
                    <Search className="h-12 w-12 text-slate-400" />
                </div>
                <p className="text-lg font-medium text-slate-600">Nenhum serviço encontrado</p>
                <p className="text-sm text-slate-400 mt-1">
                    {searchTerm ? "Tente buscar por outro termo" : "Comece adicionando um novo serviço"}
                </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="py-5 px-6 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Nome do Serviço
                    </th>
                    <th className="py-5 px-6 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Custo
                    </th>
                    <th className="py-5 px-6 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Valor Total
                    </th>
                    <th className="py-5 px-6 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Gerenciar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredTypes.map((service) => (
                    <tr
                      key={service.id}
                      className="group hover:bg-slate-50/80 transition-colors duration-200"
                    >
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-700 text-lg">{service.name}</p>
                        {/* If we had description, it would go here */}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <p className="font-bold text-slate-700 text-lg">R$ {service.cost_value.toFixed(2)}</p>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <p className="font-bold text-emerald-600 text-lg">R$ {service.total_value.toFixed(2)}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end items-center gap-3">
                          <Link
                            to={`/clinic_services/${service.id}/edit`}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group/edit"
                            title="Editar"
                          >
                            <Pen className="h-5 w-5 group-hover/edit:animate-bounce" />
                          </Link>
                          <button
                            onClick={() => handleDelete(service)}
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

      {/* Modal Component */}
      {modalState.show && (
        <Modal
          title={modalState.title}
          message={modalState.message}
          type={modalState.type}
          onClose={handleCloseModal}
          onConfirm={modalState.onConfirm}
        />
      )}

      {/* Modal de confirmação */}
      <Modal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o serviço "${selectedClinicService?.name}"? Esta ação não pode ser desfeita.`}
        type="confirmation"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
