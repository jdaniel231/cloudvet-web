import { useState, useEffect } from "react";
import { getVaccineTypes } from "../../services/vaccineType";
import { getUsers } from "../../services/user";

const formatDateToBR = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
  const day = String(adjustedDate.getDate()).padStart(2, '0');
  const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
  const year = adjustedDate.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatDateToISO = (dateString) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return null;
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

export const VaccineForm = ({ initialData = {}, onSubmit, onCancel, isEditMode = false }) => {
  const [vaccineTypeId, setVaccineTypeId] = useState(initialData.vaccineTypeId || []);
  const [applicationDate, setApplicationDate] = useState(initialData.applicationDate || new Date().toISOString().slice(0, 10));
  const [returnDate, setReturnDate] = useState(initialData.returnDate || "");
  const [appliedDose, setAppliedDose] = useState(initialData.appliedDose || "");
  const [obs, setObs] = useState(initialData.obs || "");
  const [vaccineTypes, setVaccineTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(initialData.userId || "");
  const [returnInterval, setReturnInterval] = useState("");

  const [displayApplicationDate, setDisplayApplicationDate] = useState(formatDateToBR(applicationDate));
  const [displayReturnDate, setDisplayReturnDate] = useState(formatDateToBR(returnDate));

  useEffect(() => {
    setDisplayReturnDate(formatDateToBR(returnDate));
  }, [returnDate]);

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

  const handleApplicationDateChange = (e) => {
    const value = e.target.value;
    setDisplayApplicationDate(value);
    const isoDate = formatDateToISO(value);
    if (isoDate) {
      setApplicationDate(isoDate);
    }
  };

  const handleDateCalculation = (interval) => {
    setReturnInterval(interval);
    if (applicationDate && interval) {
      const date = new Date(`${applicationDate}T00:00:00`);
      const [value, unit] = interval.split(' ');

      if (unit === 'dias') {
        date.setDate(date.getDate() + parseInt(value));
      } else if (unit === 'meses') {
        date.setMonth(date.getMonth() + parseInt(value));
      } else if (unit === 'anual') {
        date.setFullYear(date.getFullYear() + 1);
      }
      setReturnDate(date.toISOString().split('T')[0]);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const intValue = parseInt(value, 10);
    if (checked) {
      setVaccineTypeId([...vaccineTypeId, intValue]);
    } else {
      setVaccineTypeId(vaccineTypeId.filter((id) => id !== intValue));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      vaccine_type_id: vaccineTypeId,
      application_date: applicationDate,
      return_date: returnDate,
      applied_dose: appliedDose,
      user_id: userId,
      obs 
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
        <label className="block text-text text-sm font-bold mb-2">Tipo de vacina</label>
        {vaccineTypes.map((type) => (
          <div key={type.id}>
            <input
              type="checkbox"
              id={`vaccine-${type.id}`}
              value={type.id}
              onChange={handleCheckboxChange}
              checked={vaccineTypeId.includes(type.id)}
            />
            <label htmlFor={`vaccine-${type.id}`} className="ml-2">{type.name}</label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label htmlFor="applicationDate" className="block text-text text-sm font-bold mb-2">Data de Aplicação</label>
        <input
          type="text"
          id="applicationDate"
          placeholder="DD/MM/AAAA"
          value={displayApplicationDate}
          onChange={handleApplicationDateChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="appliedDose" className="block text-text text-sm font-bold mb-2">Dose Aplicada</label>
        <select
          id="appliedDose"
          value={appliedDose}
          onChange={(e) => setAppliedDose(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selecione a dose</option>
          {doseOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="user" className="block text-text text-sm font-bold mb-2">Veterinário</label>
        <select
          id="user"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selecione o veterinário</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="returnInterval" className="block text-text text-sm font-bold mb-2">Retorno</label>
        <select
          id="returnInterval"
          value={returnInterval}
          onChange={(e) => handleDateCalculation(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selecione o intervalo de retorno</option>
          {returnOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="returnDate" className="block text-text text-sm font-bold mb-2">Data de Retorno</label>
        <input
          type="text"
          id="returnDate"
          placeholder="DD/MM/AAAA"
          value={displayReturnDate}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
          readOnly
        />
      </div>
      
      <div className="mb-4">
          <label htmlFor="obs" className="block text-text text-sm font-bold mb-2">Observação</label>
          <input
            type="text"
            id="obs"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditMode ? 'Atualizar' : 'Salvar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
