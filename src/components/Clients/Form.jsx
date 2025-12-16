import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/FormFields/Input";
import {
  User,
  Phone,
  MapPin,
  FileText,
  Building,
  CreditCard,
  Save,
  X
} from "lucide-react";

export default function ClientForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    cpf: initialData.cpf || "",
    rg: initialData.rg || "",
    phone: initialData.phone || "",
    address: initialData.address || "",
    number_address: initialData.number_address || "",
    compl_address: initialData.compl_address || "",
    neighborhoods: initialData.neighborhoods || "",
  });

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Dados Pessoais */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <User className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-700">Dados Pessoais</h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <Input
              label="Nome Completo"
              id="clientName"
              value={form.name}
              onChange={handleChange("name")}
              required
              icon={User}
              placeholder="Ex: João da Silva"
            />
          </div>

          <Input
            label="CPF"
            id="cpf"
            value={form.cpf}
            onChange={handleChange("cpf")}
            icon={CreditCard}
            placeholder="000.000.000-00"
          />

          <Input
            label="RG"
            id="rg"
            value={form.rg}
            onChange={handleChange("rg")}
            icon={FileText}
            placeholder="00.000.000-0"
          />

          <Input
            label="Telefone / Celular"
            id="phone"
            value={form.phone}
            onChange={handleChange("phone")}
            icon={Phone}
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      {/* Endereço */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <MapPin className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-700">Endereço</h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="col-span-1 md:col-span-4">
            <Input
              label="Logradouro"
              id="address"
              value={form.address}
              onChange={handleChange("address")}
              icon={MapPin}
              placeholder="Ex: Rua das Flores"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <Input
              label="Número"
              id="number_address"
              value={form.number_address}
              onChange={handleChange("number_address")}
              placeholder="123"
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <Input
              label="Complemento"
              id="compl_address"
              value={form.compl_address}
              onChange={handleChange("compl_address")}
              placeholder="Ex: Apt 101"
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <Input
              label="Bairro"
              id="neighborhoods"
              value={form.neighborhoods}
              onChange={handleChange("neighborhoods")}
              icon={Building}
              placeholder="Centro"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 gap-3">
        <button
          type="button"
          onClick={() =>
            navigate(isEditMode ? `/clients/${initialData.id}` : "/clients")
          }
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
          {isEditMode ? "Salvar Alterações" : "Cadastrar Cliente"}
        </button>
      </div>
    </form>
  );
}