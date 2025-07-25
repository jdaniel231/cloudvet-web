import { useState } from "react";

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
  const [chief_complaint, setChiefComplaint] = useState(
    initialData.chief_complaint || ""
  );
  const [medical_history, setMedicalHistory] = useState(
    initialData.medical_history || ""
  );
  const [suspected_exams, setSuspectedDiagnosis] = useState(
    initialData.suspected_exams || ""
  );
  const [activeTab, setActiveTab] = useState("complaint");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      chief_complaint,
      medical_history,
      suspected_exams,
    });
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
          <div className="mb-4">
            <label
              htmlFor="chief_complaint"
              className="block text-text text-sm font-bold mb-2"
            >
              Chief Complaint:
            </label>
            <input
              type="text"
              id="chief_complaint"
              className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
              value={chief_complaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
            />
          </div>
        )}
        {activeTab === "history" && (
          <div className="mb-4">
            <label
              htmlFor="medical_history"
              className="block text-text text-sm font-bold mb-2"
            >
              Medical History:
            </label>
            <input
              type="text"
              id="medical_history"
              className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
              value={medical_history}
              onChange={(e) => setMedicalHistory(e.target.value)}
            />
          </div>
        )}
        {activeTab === "diagnosis" && (
          <div className="mb-4">
            <label
              htmlFor="suspected_exams"
              className="block text-text text-sm font-bold mb-2"
            >
              Diagnose:
            </label>
            <input
              type="text"
              id="suspected_exams"
              className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
              value={suspected_exams}
              onChange={(e) => setSuspectedDiagnosis(e.target.value)}
            />
          </div>
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