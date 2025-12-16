import { useState, useEffect } from "react";
import { getVaccineTypes } from "../../services/vaccineType";
import { getUsers } from "../../services/user";
import Input from "../common/FormFields/Input";
import Select from "../common/FormFields/Select";
import Checkbox from "../common/FormFields/Checkbox";
import { formatDateToBR, formatDateToISO } from "../../utils/dateUtils";
import {
  Syringe,
  Save,
  X,
  Calendar,
  User,
  FlaskConical,
  Stethoscope,
  Clock,
  CheckCircle,
  FileText
} from "lucide-react";

// TabButton Component matching AppointmentForm
const TabButton = ({ active, onClick, icon: Icon, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300
      ${active
        ? "bg-white text-cyan-600 shadow-md ring-1 ring-slate-100"
        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
      }
    `}
  >
    <Icon className={`h-4 w-4 ${active ? "text-cyan-500" : "text-slate-400"}`} />
    {children}
  </button>
);

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
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden w-full mx-auto">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
          <Syringe className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-700">
            {isEditMode ? "Editar Vacinação" : "Nova Vacinação"}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: Vaccine Selection */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2 mb-2 text-slate-400 uppercase text-xs font-bold tracking-wider">
                <FlaskConical className="h-4 w-4" />
                <span>Vacinas Disponíveis</span>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
                <div className="flex flex-col gap-3">
                  {vaccineTypes.map((type) => (
                    <div key={type.id} className="relative">
                      <Checkbox
                        id={`vaccine-${type.id}`}
                        value={type.id}
                        onChange={handleCheckboxChange}
                        checked={form.vaccineTypeId.includes(type.id)}
                        label={type.name}
                      />
                    </div>
                  ))}
                </div>
                {form.vaccineTypeId.length === 0 && (
                  <p className="flex items-center gap-2 text-xs text-amber-600 mt-4 font-medium bg-amber-50 px-3 py-2 rounded-lg border border-amber-100 inline-block">
                    <CheckCircle className="h-3 w-3" />
                    Selecione pelo menos uma vacina.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Application Details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 mb-2 text-slate-400 uppercase text-xs font-bold tracking-wider">
                <FileText className="h-4 w-4" />
                <span>Detalhes da Aplicação</span>
              </div>

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
                      className="bg-slate-100 font-semibold text-slate-600"
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
                    icon={Stethoscope}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
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
            {isEditMode ? "Salvar Alterações" : "Registrar Vacina"}
          </button>
        </div>
      </form>
    </div>
  );
};
