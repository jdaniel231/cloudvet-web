import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/FormFields/Input";
import Select from "../common/FormFields/Select";
import Checkbox from "../common/FormFields/Checkbox";

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
      <Input
        label="Nome do Animal"
        id="name"
        value={form.name}
        onChange={handleChange("name")}
        required
      />

      <Select
        label="Espécie"
        id="species"
        value={form.species}
        onChange={handleChange("species")}
        required
      >
        <option value="">Selecione</option>
        <option value="cachorro">Canino</option>
        <option value="gato">Felino</option>
      </Select>

      <Input
        label="Raça"
        id="breed"
        value={form.breed}
        onChange={handleChange("breed")}
      />

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
      />

      <Select
        label="Sexo"
        id="sex"
        value={form.sex}
        onChange={handleChange("sex")}
        required
      >
        <option value="">Selecione</option>
        <option value="Macho">Macho</option>
        <option value="Fêmea">Fêmea</option>
      </Select>

      <Checkbox
        label="Castrado(a)"
        id="castrated"
        checked={form.castrated}
        onChange={handleChange("castrated")}
      />

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60"
          disabled={submitting}
        >
          {submitting
            ? isEditMode
              ? "Atualizando..."
              : "Cadastrando..."
            : isEditMode
              ? "Atualizar"
              : "Cadastrar"}
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