import { useState } from "react";

export default function WeightsForm({ initialData = {}, onSubmit, isEditMode = false, onCancel }) {
  const [kg, setKg] = useState(initialData.kg || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ kg });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
         <label htmlFor="kg" className="block text-text text-sm font-bold mb-2">Peso</label>
        <input
          type="text"
          value={kg}
          onChange={(e) => setKg(e.target.value)}
          required
          className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          {isEditMode ? 'Atualizar Peso' : 'Registrar Peso'}
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