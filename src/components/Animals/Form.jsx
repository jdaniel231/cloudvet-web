import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnimalForm({ clientId, initialData = {}, onSubmit, onCancel, isEditMode = false }) {
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

      // navega SÓ após salvar com sucesso
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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-text text-sm font-bold mb-2">
          Nome do Animal:
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
          value={form.name}
          onChange={handleChange("name")}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="species" className="block text-text text-sm font-bold mb-2">
          Espécie:
        </label>
        <select
          id="species"
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
          value={form.species}
          onChange={handleChange("species")}
          required
        >
          <option value="">Selecione</option>
          <option value="cachorro">Canino</option>
          <option value="gato">Felino</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="breed" className="block text-text text-sm font-bold mb-2">
          Raça:
        </label>
        <input
          type="text"
          id="breed"
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
          value={form.breed}
          onChange={handleChange("breed")}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="age" className="block text-text text-sm font-bold mb-2">
          Idade (anos):
        </label>
        <input
          type="number"
          id="age"
          min={0}
          step={1}
          inputMode="numeric"
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
          value={form.age}
          onChange={handleChange("age")}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="sex" className="block text-text text-sm font-bold mb-2">
          Sexo:
        </label>
        <select
          id="sex"
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
          value={form.sex}
          onChange={handleChange("sex")}
          required
        >
          <option value="">Selecione</option>
          <option value="Macho">Macho</option>
          <option value="Fêmea">Fêmea</option>
        </select>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="castrated"
          className="mr-2 h-4 w-4 text-primary focus:ring-primary border-border rounded"
          checked={form.castrated}
          onChange={handleChange("castrated")}
        />
        <label htmlFor="castrated" className="text-text text-sm font-bold">
          Castrado(a)
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? (isEditMode ? "Atualizando..." : "Cadastrando...") : (isEditMode ? "Atualizar" : "Cadastrar")}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-lightText hover:bg-text text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={submitting}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
