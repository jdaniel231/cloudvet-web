import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  FileText,
  Activity,
  Calendar,
  X,
  Plus
} from "lucide-react";

const AppointmentDetails = ({ appointment, clientId, animalId, onClose }) => {
  const navigate = useNavigate();

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-slate-500">
        <Activity className="h-8 w-8 mb-2 opacity-50" />
        <p>Carregando detalhes...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden max-w-[1200px] w-full mx-auto shadow-2xl flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-start shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg shadow-lg shadow-cyan-500/20 text-white">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Detalhes da Consulta</h2>
            <p className="text-sm text-slate-500">Visualização do prontuário médico</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content - Scrollable Area */}
      <div className="p-6 space-y-6 overflow-y-auto">

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-2 text-cyan-700">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Data do Atendimento</span>
            </div>
            <p className="text-slate-800 font-semibold text-lg">
              {new Date(appointment.created_at).toLocaleDateString("pt-BR", {
                day: '2-digit', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <div className="flex items-center gap-2 mb-2 text-amber-700">
              <Activity className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Suspeita Clínica</span>
            </div>
            <p className="text-slate-800 font-medium">
              {appointment.suspected_exams || "Não informado"}
            </p>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              <FileText className="h-4 w-4" />
              Queixa Principal
            </h3>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-wrap min-h-[80px]">
              {appointment.chief_complaint}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              <Activity className="h-4 w-4" />
              Histórico Médico
            </h3>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-wrap min-h-[120px]">
              {appointment.medical_history}
            </div>
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
        <button
          onClick={onClose}
          className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
        >
          Fechar
        </button>
        <button
          onClick={() =>
            navigate(
              `/clients/${clientId}/animals/${animalId}/appointments/new`,
            )
          }
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-medium"
        >
          <Plus className="h-4 w-4 text-cyan-400" />
          Nova Consulta
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
