import { useState, useEffect } from "react";
import { getVaccineTypes } from "../../services/vaccineType";
import { getUsers } from "../../services/user";
import Input from "../common/FormFields/Input";
import Select from "../common/FormFields/Select";
import Checkbox from "../common/FormFields/Checkbox";
import { formatDateToBR, formatDateToISO } from "../../utils/dateUtils";
import { Syringe, Save, X, Calendar, User, FlaskConical, Stethoscope, Clock } from "lucide-react";

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
    <div className="bg-white rounded-3xl shadow-premium overflow-hidden border border-slate-100 w-full mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 p-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="flex items-center relative z-10">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md border border-white/20 mr-4">
            <Syringe className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              {isEditMode ? "Editar Vacinação" : "Nova Vacinação"}
            </h2>
            <p className="text-cyan-100 text-sm font-medium">Preencha os dados da aplicação</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {/* Vaccine Types Section */}
        <div className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center mb-4">
            <FlaskConical className="h-5 w-5 text-cyan-600 mr-2" />
            <label className="text-slate-800 text-sm font-bold tracking-wide uppercase">
              Tipo de Vacina
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
          {form.vaccineTypeId.length === 0 && (
            <p className="text-xs text-amber-600 mt-2 font-medium bg-amber-50 inline-block px-2 py-1 rounded">
              Selecione pelo menos uma vacina.
            </p>
          )}
        </div>

        {/* Main Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="relative">
              <Input
                label="Data de Aplicação"
                id="applicationDate"
                placeholder="DD/MM/AAAA"
                value={formatDateToBR(form.applicationDate)}
                onChange={handleApplicationDateChange}
                required
              />
              <div className="absolute right-3 top-9 text-slate-400 pointer-events-none">
                <Calendar className="h-5 w-5" />
              </div>
            </div>

            <Select
              label="Dose Aplicada"
              id="appliedDose"
              value={form.appliedDose}
              onChange={handleChange("appliedDose")}
              required
            >
              <option value="">Selecione a dose</option>
              {doseOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>

            <Select
              label="Veterinário Responsável"
              id="user"
              value={form.userId}
              onChange={handleChange("userId")}
              required
            >
              <option value="">Selecione o veterinário</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-6">
            <Select
              label="Previsão de Retorno"
              id="returnInterval"
              value={form.returnInterval}
              onChange={(e) => handleDateCalculation(e.target.value)}
            >
              <option value="">Selecione o intervalo</option>
              {returnOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>

            <div className="relative">
              <Input
                label="Data de Retorno Calculada"
                id="returnDate"
                placeholder="--"
                value={formatDateToBR(form.returnDate)}
                readOnly
                className="bg-slate-100"
              />
              <div className="absolute right-3 top-9 text-slate-400 pointer-events-none">
                <Clock className="h-5 w-5" />
              </div>
            </div>

            <Input
              label="Observações Clínicas"
              id="obs"
              value={form.obs}
              onChange={handleChange("obs")}
              placeholder="Alguma reação ou detalhe importante?"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end mt-10 pt-6 border-t border-slate-100 space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center px-6 py-3 rounded-xl text-slate-500 font-semibold hover:bg-slate-50 hover:text-slate-700 transition-all duration-300"
          >
            <X className="h-5 w-5 mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Save className="h-5 w-5 mr-2" />
            {isEditMode ? "Salvar Alterações" : "Registrar Vacina"}
          </button>
        </div>
      </form>
    </div>
  );
};
