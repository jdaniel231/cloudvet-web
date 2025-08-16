import React, { useState } from "react";
import Input from "../common/FormFields/Input";

export default function VaccineTypeForm({
  initialData = {},
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
  });

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
        label="Nome"
        id="name"
        value={form.name}
        onChange={handleChange("name")}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="ml-2 bg-lightText hover:bg-text text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}