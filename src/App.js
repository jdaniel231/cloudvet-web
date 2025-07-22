import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ClientsPage from './pages/Clients/Index';
import NewClient from './pages/Clients/New';
import ProtectedLayout from './components/layout/ProtectedLayout';
import './index.css';
import ClientDetails from './pages/Clients/ClientDetails';
import NewAnimal from './pages/Animals/New';
import AnimalDetails from './pages/Animals/AnimalDetails';
import EditClient from './pages/Clients/Edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/new" element={<NewClient />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="clients/:id/edit" element={<EditClient />} />
          <Route path="/clients/:clientId/animals/new" element={<NewAnimal />} />
          <Route path="clients/:clientId/animals/:animalId" element={<AnimalDetails />} />
        </Route>

        {/* Rota padrão: redireciona para o dashboard se logado, senão para o login */}
        <Route 
          path="*" 
          element={<Navigate to={localStorage.getItem('token') ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

