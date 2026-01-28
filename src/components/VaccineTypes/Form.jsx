import React, { useState } from "react";
import Input from "../common/FormFields/Input";
import { Syringe, Save, X } from "lucide-react";

export default function VaccineTypeForm({
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    onSubmit(form);
  };

  const isEditMode = !!initialData.id;

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden w-full mx-auto">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
          <Syringe className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-700">
            {isEditMode ? "Editar Tipo de Vacina" : "Novo Tipo de Vacina"}
          </h3>
          <p className="text-xs text-slate-400">
            {isEditMode ? "Atualize as informações do tipo" : "Cadastre um novo tipo de vacina"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-8 space-y-6">
          <Input
            label="Nome da Vacina"
            id="name"
            placeholder="Ex: V10, Raiva, Gripe..."
            value={form.name}
            onChange={handleChange("name")}
            disabled={loading}
          />
        </div>

        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 text-slate-500 font-semibold hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="h-4 w-4" />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-8 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-bold tracking-wide disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className={`h-4 w-4 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}