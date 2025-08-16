import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/FormFields/Input";

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
    <form onSubmit={handleSubmit}>
      <Input
        label="Nome do Cliente"
        id="clientName"
        value={form.name}
        onChange={handleChange("name")}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="CPF"
          id="cpf"
          value={form.cpf}
          onChange={handleChange("cpf")}
        />
        <Input
          label="RG"
          id="rg"
          value={form.rg}
          onChange={handleChange("rg")}
        />
      </div>

      <Input
        label="Telefone"
        id="phone"
        value={form.phone}
        onChange={handleChange("phone")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Endereço"
          id="address"
          value={form.address}
          onChange={handleChange("address")}
        />
        <Input
          label="Número"
          id="number_address"
          value={form.number_address}
          onChange={handleChange("number_address")}
        />
        <Input
          label="Complemento"
          id="compl_address"
          value={form.compl_address}
          onChange={handleChange("compl_address")}
        />
        <Input
          label="Bairro"
          id="neighborhoods"
          value={form.neighborhoods}
          onChange={handleChange("neighborhoods")}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditMode ? "Atualizar" : "Cadastrar"}
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(isEditMode ? `/clients/${initialData.id}` : "/clients")
          }
          className="ml-2 bg-lightText hover:bg-text text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}