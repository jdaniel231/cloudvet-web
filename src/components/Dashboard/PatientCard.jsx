import React from "react";

const PatientCard = ({ patient, getStatusColor }) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
      <span className="text-white text-sm font-medium">
        {patient.name.charAt(0)}
      </span>
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2">
        <h4 className="font-medium text-gray-800">{patient.name}</h4>
        <span
          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(patient.status)}`}
        >
          {patient.status === "healthy" && "Saudável"}
          {patient.status === "treatment" && "Tratamento"}
          {patient.status === "recovery" && "Recuperação"}
        </span>
      </div>
      <p className="text-xs text-gray-500">
        {patient.breed} • {patient.age}
      </p>
      <p className="text-xs text-gray-400">
        Última visita: {patient.lastVisit}
      </p>
    </div>
  </div>
);

export default PatientCard;
