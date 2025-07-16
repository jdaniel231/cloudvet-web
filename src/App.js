import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import authService from './services/authService';
import './index.css';

// Componente simples para o painel
const Dashboard = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login'; // Força o recarregamento para limpar o estado
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Sair
          </button>
        </div>
        <p className="text-gray-600">Bem-vindo, {user?.email || 'usuário'}!</p>
        {/* Aqui você pode adicionar mais componentes e funcionalidades do seu dashboard */}
      </div>
    </div>
  );
};

// Um componente para proteger rotas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
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

