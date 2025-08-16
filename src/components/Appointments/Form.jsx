import { useState } from "react";
import Input from "../common/FormFields/Input";

const TabButton = ({ active, onClick, children }) => (
  <button
    type="button"
    className={`px-4 py-2 text-sm font-medium ${
      active
        ? "text-primary border-b-2 border-primary"
        : "text-gray-500 hover:text-gray-700"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default function AppointmentForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  onCancel,
}) {
  const [form, setForm] = useState({
    chief_complaint: initialData.chief_complaint || "",
    medical_history: initialData.medical_history || "",
    suspected_exams: initialData.suspected_exams || "",
  });
  const [activeTab, setActiveTab] = useState("complaint");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <TabButton
            active={activeTab === "complaint"}
            onClick={() => setActiveTab("complaint")}
          >
            Chief Complaint
          </TabButton>
          <TabButton
            active={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          >
            Medical History
          </TabButton>
          <TabButton
            active={activeTab === "diagnosis"}
            onClick={() => setActiveTab("diagnosis")}
          >
            Diagnose
          </TabButton>
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === "complaint" && (
          <Input
            label="Chief Complaint"
            id="chief_complaint"
            value={form.chief_complaint}
            onChange={handleChange("chief_complaint")}
          />
        )}
        {activeTab === "history" && (
          <Input
            label="Medical History"
            id="medical_history"
            value={form.medical_history}
            onChange={handleChange("medical_history")}
          />
        )}
        {activeTab === "diagnosis" && (
          <Input
            label="Diagnose"
            id="suspected_exams"
            value={form.suspected_exams}
            onChange={handleChange("suspected_exams")}
          />
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditMode ? "Atualizar" : "Cadastrar"}
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