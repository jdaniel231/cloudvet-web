import React from "react";
import { Stethoscope, Weight, Syringe, FileText, Pill, CalendarClock, Activity } from "lucide-react";

const ActionButtons = ({ onViewChange, currentView, layout = "grid" }) => {
  const actions = [
    {
      label: "Consultas",
      view: "consultations",
      icon: Stethoscope,
      bg: "bg-cyan-600",
      gradient: "from-cyan-500 to-cyan-700",
      shadow: "shadow-cyan-500/30",
    },
    {
      label: "Pesos",
      view: "weights",
      icon: Weight,
      bg: "bg-slate-600",
      gradient: "from-slate-500 to-slate-700",
      shadow: "shadow-slate-500/30",
    },
    {
      label: "Vacinas",
      view: "vaccines",
      icon: Syringe,
      bg: "bg-teal-600",
      gradient: "from-teal-500 to-teal-700",
      shadow: "shadow-teal-500/30",
    },
    {
      label: "Anexos",
      view: "attachments",
      icon: FileText,
      bg: "bg-blue-600",
      gradient: "from-blue-500 to-blue-700",
      shadow: "shadow-blue-500/30",
    },
    {
      label: "Receitas",
      view: "prescriptions",
      icon: Pill,
      bg: "bg-sky-600",
      gradient: "from-sky-500 to-sky-700",
      shadow: "shadow-sky-500/30",
    },
    {
      label: "Agendar",
      view: "scheduleReturn",
      icon: CalendarClock,
      bg: "bg-indigo-600",
      gradient: "from-indigo-500 to-indigo-700",
      shadow: "shadow-indigo-500/30",
    },
  ];

  if (layout === "vertical") {
    return (
      <div className="bg-white rounded-3xl shadow-premium p-6 border border-slate-100 h-fit sticky top-24">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 px-2">
          <Activity className="h-4 w-4" />
          Prontuário
        </h3>
        <div className="flex flex-col gap-2">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => onViewChange(action.view)}
              className={`group flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300 text-left ${currentView === action.view
                  ? "bg-cyan-50 text-cyan-700 shadow-sm ring-1 ring-cyan-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shadow-md transition-transform duration-300 ${currentView === action.view ? "scale-110" : "group-hover:scale-110"
                  } bg-gradient-to-br ${action.gradient}`}
              >
                <action.icon className="h-4 w-4" />
              </div>
              <span className="font-semibold text-sm">{action.label}</span>
              {currentView === action.view && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-premium p-8 mb-8 border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Activity className="h-6 w-6 text-cyan-500" />
        Ações Rápidas
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => onViewChange(action.view)}
            className="group relative flex flex-col items-center p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Icon Container */}
            <div className={`w-14 h-14 rounded-2xl mb-3 flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${action.gradient} ${action.shadow} group-hover:scale-110 transition-transform duration-300`}>
              <action.icon className="h-7 w-7" />
            </div>

            {/* Label */}
            <span className="font-semibold text-slate-600 group-hover:text-slate-900 transition-colors text-sm">
              {action.label}
            </span>

            {/* Active Indicator (Optional) */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-cyan-100 transition-all duration-300"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
