import React, { useState, useEffect } from "react";
import { Weight, Plus, Trash, Calendar, User, TrendingUp } from "lucide-react";
import { useParams } from "react-router-dom";
import { deleteWeight, getWeights } from "../../services/weight";
import Modal from "../common/Modal";

const WeightHistory = ({ weights, onAdd }) => {
  const { clientId, animalId } = useParams();
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
    type: "confirmation"
  });
  const [weightList, setWeightList] = useState(weights);

  useEffect(() => {
    // Sort by date descending
    const sorted = weights?.sort((a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
    ) || [];
    setWeightList(sorted);
  }, [weights]);

  const handleDelete = async (weightId) => {
    setModalState({
      show: true,
      title: "Confirmar Exclusão",
      message: "Tem certeza que deseja excluir este registro de peso?",
      type: "confirmation",
      onConfirm: async () => {
        try {
          await deleteWeight(clientId, animalId, weightId);
          const updatedWeights = await getWeights(clientId, animalId);
          // Sort by date descending
          const sorted = updatedWeights?.sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
          ) || [];
          setWeightList(sorted);
          setModalState({
            show: false,
            title: "",
            message: "",
            onConfirm: null,
            type: "success"
          });
        } catch (error) {
          console.error("Erro ao excluir peso:", error);
          setModalState({
            show: true,
            title: "Erro!",
            message: "Ocorreu um erro ao excluir o peso.",
            onConfirm: null,
            type: "error"
          });
        }
      },
    });
  };

  const currentWeight = weightList.length > 0 ? weightList[0].kg : 0;
  const previousWeight = weightList.length > 1 ? weightList[1].kg : 0;
  const weightDiff = currentWeight - previousWeight;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg shadow-lg shadow-slate-500/20 text-white">
              <Weight className="h-5 w-5" />
            </div>
            Controle de Peso
          </h3>
          <p className="text-slate-500 text-sm mt-1 ml-11">
            Histórico de pesagem e evolução
          </p>
        </div>

        <button
          onClick={onAdd}
          className="group flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
          <span className="font-semibold text-sm">Nova Pesagem</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 min-h-[400px]">
        {weightList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Weight className="h-8 w-8 text-slate-300" />
            </div>
            <h4 className="text-slate-600 font-semibold mb-1">Nenhum peso registrado</h4>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Comece a monitorar o peso clicando em "Nova Pesagem".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Latest Weight Highlight */}
            <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20 mb-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-8 opacity-10">
                <TrendingUp className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <p className="text-emerald-100 text-sm font-medium mb-1">Peso Atual</p>
                <h2 className="text-4xl font-bold mb-2">{currentWeight} <span className="text-2xl font-normal opacity-80">kg</span></h2>
                <p className="text-emerald-50 text-sm flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(weightList[0].created_at).toLocaleDateString("pt-BR")}
                  {weightList.length > 1 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${weightDiff > 0 ? 'bg-white/20' : 'bg-white/20'}`}>
                      {weightDiff > 0 ? '+' : ''}{weightDiff.toFixed(1)} kg vs anterior
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* History List */}
            {weightList.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Weight className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 text-lg">
                      {item.kg} <span className="text-sm text-slate-400 font-normal">kg</span>
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.created_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.user?.email && (
                    <div className="hidden sm:flex items-center gap-1 text-xs text-slate-300 bg-slate-50 px-2 py-1 rounded">
                      <User className="h-3 w-3" />
                      {item.user.email.split('@')[0]}
                    </div>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Excluir"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
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

export default WeightHistory;
