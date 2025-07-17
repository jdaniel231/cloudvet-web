import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard';
import './index.css';

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

