import { useState } from "react";
import Input from "../common/FormFields/Input";

export default function WeightsForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  onCancel,
}) {
  const [form, setForm] = useState({
    kg: initialData.kg || "",
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
        label="Peso"
        id="kg"
        value={form.kg}
        onChange={handleChange("kg")}
        required
      />
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {isEditMode ? "Atualizar Peso" : "Registrar Peso"}
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