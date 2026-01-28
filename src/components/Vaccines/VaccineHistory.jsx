import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteVaccine, getVaccinesByAnimal } from "../../services/vaccine";
import Modal from "../common/Modal";
import { Syringe, Plus, Trash, Calendar, User, AlertCircle, CheckCircle2 } from "lucide-react";

const VaccineHistory = () => {
  const { clientId, animalId } = useParams();
  const [vaccines, setVaccines] = useState([]);
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
    type: "confirmation"
  });

  const navigate = useNavigate();

  const fetchVaccines = useCallback(async () => {
    try {
      const vaccinesData = await getVaccinesByAnimal(animalId);
      // Sort by application date descending
      const sorted = vaccinesData?.sort((a, b) =>
        new Date(b.application_date) - new Date(a.application_date)
      ) || [];
      setVaccines(sorted);
    } catch (error) {
      console.error(error);
    }
  }, [animalId]);

  useEffect(() => {
    fetchVaccines();
  }, [clientId, animalId, fetchVaccines]);

  const handleDelete = async (vaccineId) => {
    setModalState({
      show: true,
      title: "Confirmar Exclusão",
      message: "Tem certeza que deseja excluir esta vacina?",
      type: "confirmation",
      onConfirm: async () => {
        try {
          await deleteVaccine(vaccineId);
          fetchVaccines();
          setModalState({
            show: false,
            title: "",
            message: "",
            onConfirm: null,
            type: "success"
          });
        } catch (error) {
          console.error("Erro ao excluir vacina:", error);
          setModalState({
            show: true,
            title: "Erro!",
            message: "Ocorreu um erro ao excluir a vacina.",
            onConfirm: null,
            type: "error"
          });
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg shadow-teal-500/20 text-white">
              <Syringe className="h-5 w-5" />
            </div>
            Carteira de Vacinação
          </h3>
          <p className="text-slate-500 text-sm mt-1 ml-11">
            Histórico de imunização e datas de reforço
          </p>
        </div>

        <button
          onClick={() => navigate(`/clients/${clientId}/animals/${animalId}/vaccines/new`)}
          className="group flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <span className="font-semibold text-sm">Nova Vacina</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 min-h-[400px]">
        {vaccines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Syringe className="h-8 w-8 text-slate-300" />
            </div>
            <h4 className="text-slate-600 font-semibold mb-1">Nenhuma vacina registrada</h4>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Mantenha a saúde em dia registrando a primeira vacina.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* List Header - Hidden on mobile, visible on desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <div className="col-span-4 pl-2">Vacina / Veterinário</div>
              <div className="col-span-3">Data Aplicação</div>
              <div className="col-span-3">Prox. Reforço</div>
              <div className="col-span-2 text-right pr-2">Ações</div>
            </div>

            {/* List Items */}
            <div className="divide-y divide-slate-50">
              {vaccines.map((item) => {
                const isUpcomingReinforcement = new Date(item.return_date) > new Date();

                return (
                  <div
                    key={item.id}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors duration-200"
                  >
                    {/* Column 1: Info */}
                    <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isUpcomingReinforcement ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                        <Syringe className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-700 text-sm md:text-base">
                          {item.vaccine_type?.name || "Vacina"}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                          <User className="h-3 w-3" />
                          <span>{item.user?.name || "Veterinário"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Applied Date */}
                    <div className="col-span-6 md:col-span-3">
                      <div className="md:hidden text-xs text-slate-400 mb-1">Aplicada em</div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-teal-500 md:hidden" />
                        <span className="font-medium text-sm">
                          {new Date(item.application_date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                        </span>
                      </div>
                    </div>

                    {/* Column 3: Return Date */}
                    <div className="col-span-6 md:col-span-3">
                      <div className="md:hidden text-xs text-slate-400 mb-1">Reforço</div>
                      <div className={`flex items-center gap-2 ${isUpcomingReinforcement ? 'text-amber-600' : 'text-slate-500'}`}>
                        <AlertCircle className={`h-4 w-4 md:hidden ${isUpcomingReinforcement ? 'text-amber-500' : 'text-slate-400'}`} />
                        <span className={`font-medium text-sm py-1 px-2 rounded-md ${isUpcomingReinforcement ? 'bg-amber-50 md:bg-transparent' : ''}`}>
                          {new Date(item.return_date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                        </span>
                      </div>
                    </div>

                    {/* Column 4: Actions */}
                    <div className="col-span-12 md:col-span-2 flex justify-end">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors md:opacity-0 md:group-hover:opacity-100"
                        title="Remover"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Modal
        show={modalState.show}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        onConfirm={modalState.onConfirm}
        onCancel={() =>
          setModalState({
            show: false,
            title: "",
            message: "",
            onConfirm: null,
          })
        }
      />
    </div>
  );
};

export default VaccineHistory;
