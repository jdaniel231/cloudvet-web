import { useState, useEffect } from "react";
import { getVaccineTypes } from "../../services/vaccineType";
import { getUsers } from "../../services/user";
import Input from "../common/FormFields/Input";
import Select from "../common/FormFields/Select";
import Checkbox from "../common/FormFields/Checkbox";
import { formatDateToBR, formatDateToISO } from "../../utils/dateUtils";

export const VaccineForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isEditMode = false,
}) => {
  const [form, setForm] = useState({
    vaccineTypeId: initialData.vaccineTypeId || [],
    applicationDate:
      initialData.applicationDate || new Date().toISOString().slice(0, 10),
    returnDate: initialData.returnDate || "",
    appliedDose: initialData.appliedDose || "",
    obs: initialData.obs || "",
    userId: initialData.userId || "",
    returnInterval: "",
  });

  const [vaccineTypes, setVaccineTypes] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const vaccineTypesData = await getVaccineTypes();
        setVaccineTypes(vaccineTypesData);
        const usersData = await getUsers();
        console.log("Fetched users:", usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch initial data", error);
      }
    };
    fetchInitialData();
  }, []);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplicationDateChange = (e) => {
    const value = e.target.value;
    const isoDate = formatDateToISO(value);
    if (isoDate) {
      setForm((prev) => ({ ...prev, applicationDate: isoDate }));
    }
  };

  const handleDateCalculation = (interval) => {
    setForm((prev) => ({ ...prev, returnInterval: interval }));
    if (form.applicationDate && interval) {
      const date = new Date(form.applicationDate);

      if (interval === "anual") {
        date.setFullYear(date.getFullYear() + 1);
      } else {
        const [value, unit] = interval.split(" ");
        if (unit === "dias") {
          date.setDate(date.getDate() + parseInt(value));
        } else if (unit === "meses") {
          date.setMonth(date.getMonth() + parseInt(value));
        }
      }

      setForm((prev) => ({
        ...prev,
        returnDate: date.toISOString().split("T")[0],
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const intValue = parseInt(value, 10);
    setForm((prev) => ({
      ...prev,
      vaccineTypeId: checked
        ? [...prev.vaccineTypeId, intValue]
        : prev.vaccineTypeId.filter((id) => id !== intValue),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      vaccine_type_id: form.vaccineTypeId,
      application_date: form.applicationDate,
      return_date: form.returnDate,
      applied_dose: form.appliedDose,
      user_id: form.userId,
      obs: form.obs,
    });
  };

  const doseOptions = [
    "primeira",
    "segunda",
    "terceira",
    "quarta",
    "semestral",
    "anual",
  ];

  const returnOptions = [
    "15 dias",
    "21 dias",
    "28 dias",
    "30 dias",
    "36 dias",
    "45 dias",
    "11 meses",
    "anual",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-text text-sm font-bold mb-2">
          Tipo de vacina
        </label>
        {vaccineTypes.map((type) => (
          <Checkbox
            key={type.id}
            id={`vaccine-${type.id}`}
            value={type.id}
            onChange={handleCheckboxChange}
            checked={form.vaccineTypeId.includes(type.id)}
            label={type.name}
          />
        ))}
      </div>

      <Input
        label="Data de Aplicação"
        id="applicationDate"
        placeholder="DD/MM/AAAA"
        value={formatDateToBR(form.applicationDate)}
        onChange={handleApplicationDateChange}
      />

      <Select
        label="Dose Aplicada"
        id="appliedDose"
        value={form.appliedDose}
        onChange={handleChange("appliedDose")}
      >
        <option value="">Selecione a dose</option>
        {doseOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>

      <Select
        label="Veterinário"
        id="user"
        value={form.userId}
        onChange={handleChange("userId")}
      >
        <option value="">Selecione o veterinário</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Select>

      <Select
        label="Retorno"
        id="returnInterval"
        value={form.returnInterval}
        onChange={(e) => handleDateCalculation(e.target.value)}
      >
        <option value="">Selecione o intervalo de retorno</option>
        {returnOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>

      <Input
        label="Data de Retorno"
        id="returnDate"
        placeholder="DD/MM/AAAA"
        value={formatDateToBR(form.returnDate)}
        readOnly
      />

      <Input
        label="Observação"
        id="obs"
        value={form.obs}
        onChange={handleChange("obs")}
      />

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditMode ? "Atualizar" : "Salvar"}
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
};
