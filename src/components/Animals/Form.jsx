import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/FormFields/Input";
import Select from "../common/FormFields/Select";
import Checkbox from "../common/FormFields/Checkbox";
import {
  PawPrint,
  Tag,
  Calendar,
  Weight,
  Palette,
  Save,
  X
} from "lucide-react";

export default function AnimalForm({
  clientId,
  initialData = {},
  onSubmit,
  onCancel,
  isEditMode = false,
}) {
  const [form, setForm] = useState({
    name: initialData.name ?? "",
    species: initialData.species ?? "",
    breed: initialData.breed ?? "",
    age: initialData.age ?? "",
    sex: initialData.sex ?? "",
    castrated: Boolean(initialData.castrated) || false,
  });
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    const value = field === "castrated" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        species: form.species.trim(),
        breed: form.breed.trim(),
        age: Number.parseInt(form.age, 10),
        sex: form.sex,
        castrated: !!form.castrated,
      };

      await onSubmit?.(payload);

      if (isEditMode) {
        navigate(`/clients/${clientId}/animals/${initialData.id}`);
      } else {
        navigate(`/clients/${clientId}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    onCancel?.() || navigate(`/clients/${clientId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
        <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
          <PawPrint className="h-5 w-5" />
        </div>
        <h3 className="font-bold text-slate-700">Dados do Paciente</h3>
      </div>

      {/* Content */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Name */}
        <div className="col-span-1 md:col-span-12">
          <Input
            label="Nome do Animal"
            id="name"
            value={form.name}
            onChange={handleChange("name")}
            required
            icon={Tag}
            placeholder="Ex: Rex"
          />
        </div>

        {/* Species & Breed */}
        <div className="col-span-1 md:col-span-6">
          <Select
            label="Espécie"
            id="species"
            value={form.species}
            onChange={handleChange("species")}
            required
          >
            <option value="">Selecione...</option>
            <option value="cachorro">Canino</option>
            <option value="gato">Felino</option>
          </Select>
        </div>

        <div className="col-span-1 md:col-span-6">
          <Input
            label="Raça"
            id="breed"
            value={form.breed}
            onChange={handleChange("breed")}
            placeholder="Ex: Vira-lata"
            icon={Palette} // Using Palette as a proxy for visual type/breed
          />
        </div>

        {/* Age, Sex & Status */}
        <div className="col-span-1 md:col-span-4">
          <Input
            label="Idade (anos)"
            id="age"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            value={form.age}
            onChange={handleChange("age")}
            required
            icon={Calendar}
          />
        </div>

        <div className="col-span-1 md:col-span-4">
          <Select
            label="Sexo"
            id="sex"
            value={form.sex}
            onChange={handleChange("sex")}
            required
          >
            <option value="">Selecione...</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </Select>
        </div>

        <div className="col-span-1 md:col-span-4 flex items-center pt-6">
          <Checkbox
            label="Animal Castrado"
            id="castrated"
            checked={form.castrated}
            onChange={handleChange("castrated")}
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          disabled={submitting}
          className="flex items-center gap-2 px-6 py-2.5 text-slate-500 font-semibold hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-all"
        >
          <X className="h-4 w-4" />
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-8 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-bold tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4 text-emerald-400" />
          {submitting
            ? isEditMode
              ? "Atualizando..."
              : "Cadastrando..."
            : isEditMode
              ? "Salvar"
              : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}