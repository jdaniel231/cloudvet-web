import { useState } from "react";
import Input from "../common/FormFields/Input";
import {
  FileText,
  Activity,
  Stethoscope,
  Save,
  X,
  CheckCircle2
} from "lucide-react";

const TabButton = ({ active, onClick, icon: Icon, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300
      ${active
        ? "bg-white text-cyan-600 shadow-md ring-1 ring-slate-100"
        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
      }
    `}
  >
    <Icon className={`h-4 w-4 ${active ? "text-cyan-500" : "text-slate-400"}`} />
    {children}
  </button>
);

export default function AppointmentForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  onCancel,
}) {
  const [form, setForm] = useState({
    chief_complaint: initialData.chief_complaint || "",
    medical_history: initialData.medical_history || "",
    suspected_exams: initialData.suspected_exams || "",
  });
  const [activeTab, setActiveTab] = useState("complaint");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

      {/* Header Tabs */}
      <div className="bg-slate-50/50 p-2 border-b border-slate-100">
        <div className="flex p-1 bg-slate-100/50 rounded-2xl">
          <TabButton
            active={activeTab === "complaint"}
            onClick={() => setActiveTab("complaint")}
            icon={FileText}
          >
            Queixa Principal
          </TabButton>
          <TabButton
            active={activeTab === "history"}
            onClick={() => setActiveTab("history")}
            icon={Activity}
          >
            Histórico Médico
          </TabButton>
          <TabButton
            active={activeTab === "diagnosis"}
            onClick={() => setActiveTab("diagnosis")}
            icon={Stethoscope}
          >
            Diagnóstico
          </TabButton>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 min-h-[300px]">
        {activeTab === "complaint" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 mb-2 text-slate-400 uppercase text-xs font-bold tracking-wider">
              <FileText className="h-4 w-4" />
              <span>Relato do Proprietário</span>
            </div>
            <textarea
              id="chief_complaint"
              value={form.chief_complaint}
              onChange={handleChange("chief_complaint")}
              placeholder="Descreva a queixa principal detalhadamente..."
              className="w-full h-64 p-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-700 placeholder:text-slate-400 resize-none font-medium leading-relaxed"
            />
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 mb-2 text-slate-400 uppercase text-xs font-bold tracking-wider">
              <Activity className="h-4 w-4" />
              <span>Histórico Clínico</span>
            </div>
            <textarea
              id="medical_history"
              value={form.medical_history}
              onChange={handleChange("medical_history")}
              placeholder="Histórico médico pregresso, alergias, medicações em uso..."
              className="w-full h-64 p-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-700 placeholder:text-slate-400 resize-none font-medium leading-relaxed"
            />
          </div>
        )}

        {activeTab === "diagnosis" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 mb-2 text-slate-400 uppercase text-xs font-bold tracking-wider">
              <Stethoscope className="h-4 w-4" />
              <span>Hipótese Diagnóstica</span>
            </div>
            <Input
              label="Diagnóstico Suspeito"
              id="suspected_exams"
              value={form.suspected_exams}
              onChange={handleChange("suspected_exams")}
              placeholder="Ex: Gastroenterite infecciosa..."
              className="bg-slate-50"
            />
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-sm">
              <p className="font-semibold mb-1">Nota:</p>
              <p>Preencha este campo com a suspeita clínica inicial para orientar os exames complementares.</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-2.5 text-slate-500 font-semibold hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-all"
        >
          <X className="h-4 w-4" />
          Cancelar
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-bold tracking-wide"
        >
          <Save className="h-4 w-4 text-cyan-400" />
          {isEditMode ? "Salvar Alterações" : "Finalizar Consulta"}
        </button>
      </div>
    </form>
  );
}