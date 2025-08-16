import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa o Link e useNavigate

import {
  PlusCircle,
  HospitalIcon,
  UserRound,
  Dog,
  DollarSign,
  Eye,
} from "lucide-react";
import AppointmentCard from "../components/Dashboard/AppointmentCard";

const StatCard = ({ title, value, icon }) => (
  <div
    className={`bg-card rounded-xl shadow-sm border border-border p-6 flex items-center space-x-4`}
  >
    <div className="p-3 rounded-full bg-opacity-20">{icon}</div>
    <div>
      <p className="text-sm font-medium text-lightText">{title}</p>
      <p className="text-2xl font-bold text-text">{value}</p>
    </div>
  </div>
);

const PatientCard = ({ patient, getStatusColor }) => (
  <div className="bg-background p-4 rounded-lg border border-border flex justify-between items-center">
    <div>
      <p className="font-semibold text-text">{patient.name}</p>
      <p className="text-sm text-lightText">{patient.lastVisit}</p>
    </div>
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}
    >
      {patient.status}
    </span>
  </div>
);

const QuickActionButton = ({ label, icon, path, navigate }) => (
  <button
    className="flex flex-col items-center justify-center p-4 bg-background rounded-lg hover:bg-border transition-colors"
    onClick={() =>
      path ? navigate(path) : alert(` ${label} (Ação não implementada)`)
    }
  >
    {icon}
    <span className="mt-2 text-sm font-medium text-primary">{label}</span>
  </button>
);

function Dashboard() {
  
  const navigate = useNavigate();

  const stats = [
    {
      title: "Consultas Hoje",
      value: "12",
      icon: <HospitalIcon className="h-6 w-6 text-primary" />,
      
    },
    {
      title: " Pacientes",
      value: "5",
      icon: <UserRound className="h-6 w-6 text-primary" />,
      
    },
    {
      title: "Animais",
      value: "8",
      icon: <Dog className="h-6 w-6 text-primary" />,
      
    },
    {
      title: "Caixa de hoje",
      value: "R$ 2.500",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      
    },
  ];

  const appointments = [
    {
      id: 1,
      patientName: "Maria Silva",
      date: "17/07/2025",
      value: "150.00",
      status: "Confirmado",
    },
    {
      id: 2,
      patientName: "João Santos",
      date: "17/07/2025",
      value: "75.50",
      status: "Pendente",
    },
    {
      id: 3,
      patientName: "Ana Costa",
      date: "16/07/2025",
      value: "320.00",
      status: "Pago",
    },
    {
      id: 4,
      patientName: "Carlos Pereira",
      date: "16/07/2025",
      value: "50.00",
      status: "Cancelado",
    },
  ];

  const patients = [
    { id: 1, name: "Carlos Pereira", lastVisit: "Ontem", status: "Ativo" },
    { id: 2, name: "Fernanda Lima", lastVisit: "Há 3 dias", status: "Novo" },
    {
      id: 3,
      name: "Pedro Almeida",
      lastVisit: "Há 1 semana",
      status: "Inativo",
    },
  ];

  const quickActions = [
    {
      label: "Novo Agendamento",
      icon: <PlusCircle className="h-6 w-6 text-primary" />,
    },
    {
      label: "Novo Paciente",
      icon: <PlusCircle className="h-6 w-6 text-primary" />,
      path: "/clients/new",
    },
    {
      label: "Ver Relatórios",
      icon: <PlusCircle className="h-6 w-6 text-primary" />,
    },
    {
      label: "Gerenciar Estoque",
      icon: <PlusCircle className="h-6 w-6 text-primary" />,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmado":
      case "Ativo":
        return "bg-green-100 text-green-800"; // Keep green for positive status
      case "Pendente":
      case "Novo":
        return "bg-yellow-100 text-yellow-800"; // Keep yellow for pending/new
      case "Pago":
        return "bg-primary-light text-primary"; // Use primary for paid
      case "Cancelado":
      case "Inativo":
        return "bg-red-100 text-red-800"; // Keep red for negative status
      default:
        return "bg-lightText-light text-lightText"; // Use lightText for default
    }
  };

  const filteredAppointments = appointments;

  const filteredPatients = patients;

  return (
    <div>
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agendamentos */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-sm border border-border">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text">Tickets</h3>
            <button className="flex items-center space-x-2 text-primary hover:text-primary-dark">
              <Eye className="h-4 w-4" />
              <span className="text-sm">Ver Todos</span>
            </button>
          </div>
          <div className="grid grid-cols-5 gap-4 items-center p-4 border-b border-border bg-background">
            <div className="col-span-1 font-semibold text-lightText">
              CLIENTE
            </div>
            <div className="col-span-1 font-semibold text-lightText">DATA</div>
            <div className="col-span-1 font-semibold text-lightText">VALOR</div>
            <div className="col-span-1 font-semibold text-lightText">
              STATUS
            </div>
            <div className="col-span-1 font-semibold text-lightText text-right">
              AÇÕES
            </div>
          </div>
          <div className="p-6 space-y-4">
            {filteredAppointments.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        </div>

        {/* Pacientes Recentes */}
        <div className="bg-card rounded-xl shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-text">
              Pacientes Recentes
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {filteredPatients.map((p) => (
              <PatientCard
                key={p.id}
                patient={p}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ações rápidas */}
      <div className="mt-6 bg-card rounded-xl shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionButton key={index} {...action} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
