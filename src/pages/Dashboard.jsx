import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa o Link e useNavigate
import authService from '../services/authService';
import { PlusCircle, HospitalIcon, UserRound, Dog, DollarSign, Eye } from 'lucide-react';
import AppointmentCard from '../components/Dashboard/AppointmentCard';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-xl shadow-sm border p-6 flex items-center space-x-4 ${color}`}>
    <div className="p-3 rounded-full bg-opacity-20">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const PatientCard = ({ patient, getStatusColor }) => (
  <div className="bg-gray-50 p-4 rounded-lg border flex justify-between items-center">
    <div>
      <p className="font-semibold text-gray-800">{patient.name}</p>
      <p className="text-sm text-gray-600">{patient.lastVisit}</p>
    </div>
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}>
      {patient.status}
    </span>
  </div>
);

const QuickActionButton = ({ label, icon, path, navigate }) => (
  <button 
    className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
    onClick={() => path ? navigate(path) : alert(` ${label} (Ação não implementada)`)}
  >
    {icon}
    <span className="mt-2 text-sm font-medium text-blue-700">{label}</span>
  </button>
);


function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const stats = [
    { title: 'Consultas Hoje', value: '12', icon: <HospitalIcon className="h-6 w-6 text-blue-600" />, color: 'text-blue-600' },
    { title: ' Pacientes', value: '5', icon: <UserRound className="h-6 w-6 text-green-600" />, color: 'text-green-600' },
    { title: 'Animais', value: '8', icon: <Dog className="h-6 w-6 text-purple-600" />, color: 'text-purple-600' },
    { title: 'Caixa de hoje', value: 'R$ 2.500', icon: <DollarSign className="h-6 w-6 text-yellow-600" />, color: 'text-yellow-600' },
  ];

  const appointments = [
    { id: 1, patientName: 'Maria Silva', date: '17/07/2025', value: '150.00', status: 'Confirmado' },
    { id: 2, patientName: 'João Santos', date: '17/07/2025', value: '75.50', status: 'Pendente' },
    { id: 3, patientName: 'Ana Costa', date: '16/07/2025', value: '320.00', status: 'Pago' },
    { id: 4, patientName: 'Carlos Pereira', date: '16/07/2025', value: '50.00', status: 'Cancelado' },
  ];

  const patients = [
    { id: 1, name: 'Carlos Pereira', lastVisit: 'Ontem', status: 'Ativo' },
    { id: 2, name: 'Fernanda Lima', lastVisit: 'Há 3 dias', status: 'Novo' },
    { id: 3, name: 'Pedro Almeida', lastVisit: 'Há 1 semana', status: 'Inativo' },
  ];

  const quickActions = [
    { label: 'Novo Agendamento', icon: <PlusCircle className="h-6 w-6 text-blue-500" /> },
    { label: 'Novo Paciente', icon: <PlusCircle className="h-6 w-6 text-green-500" />, path: '/clients/new' },
    { label: 'Ver Relatórios', icon: <PlusCircle className="h-6 w-6 text-purple-500" /> },
    { label: 'Gerenciar Estoque', icon: <PlusCircle className="h-6 w-6 text-yellow-500" /> },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmado':
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
      case 'Novo':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pago':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelado':
      case 'Inativo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAppointments = appointments.filter(appt =>
    appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Tickets</h3>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <Eye className="h-4 w-4" />
              <span className="text-sm">Ver Todos</span>
            </button>
          </div>
          <div className="grid grid-cols-5 gap-4 items-center p-4 border-b bg-gray-50">
              <div className="col-span-1 font-semibold text-gray-600">CLIENTE</div>
              <div className="col-span-1 font-semibold text-gray-600">DATA</div>
              <div className="col-span-1 font-semibold text-gray-600">VALOR</div>
              <div className="col-span-1 font-semibold text-gray-600">STATUS</div>
              <div className="col-span-1 font-semibold text-gray-600 text-right">AÇÕES</div>
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
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Pacientes Recentes</h3>
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
      <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
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