import { Save, Syringe, X } from "lucide-react";
import Input from "../common/FormFields/Input";
import { useState } from "react";

export default function ClinicServiceForm({ initialData = {}, onSubmit, onCancel }) {
  const data = initialData || {};
  const [formData, setFormData] = useState({
    name: data.name || "",
    cost_value: data.cost_value || 0,
    total_value: data.total_value || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      cost_value: formData.cost_value ? parseFloat(String(formData.cost_value).replace(',', '.')) : 0,
      total_value: formData.total_value ? parseFloat(String(formData.total_value).replace(',', '.')) : 0,
    };
    onSubmit(dataToSubmit);
  };

  const isEditMode = !!data.id;

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden w-full mx-auto">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
          <Syringe className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-700">
            {isEditMode ? "Editar Serviço" : "Novo Serviço"}
          </h3>
          <p className="text-xs text-slate-400">
            {isEditMode ? "Atualize as informações do serviço" : "Cadastre um novo serviço"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-8 space-y-6">
          <Input
            label="Nome do Serviço"
            id="name"
            name="name"
            placeholder="Ex: Serviço de Clínica, Consulta de Saúde, etc..."
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Custo Total"
            id="cost_value" // Mantido para o 'for' do label
            name="cost_value" // Adicionado para o handleChange
            type="number"
            placeholder="Ex: R$ 100,00"
            value={formData.cost_value}
            onChange={handleChange}
          />
          <Input
            label="Valor Total"
            id="total_value" // Mantido para o 'for' do label
            name="total_value" // Adicionado para o handleChange
            type="number"
            placeholder="Ex: R$ 100,00"
            value={formData.total_value}
            onChange={handleChange}
          />
        </div>

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
            className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-8 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-bold tracking-wide"
          >
            <Save className="h-4 w-4 text-emerald-400" />
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}