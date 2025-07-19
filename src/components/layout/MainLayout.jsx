import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { PlusCircle, HospitalIcon, UserRound, Dog, DollarSign, Eye } from 'lucide-react';

const Sidebar = ({ sidebarOpen, activeTab, setActiveTab, menuItems, handleLogout }) => (
  <div className={`w-64 bg-gray-800 text-white p-4 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
    <h2 className="text-2xl font-bold mb-6">CloudVet</h2>
    <nav>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className={`mb-2 ${activeTab === item.id ? 'font-bold' : ''}`}>
            {item.path ? (
              <Link to={item.path} className="block w-full text-left p-2 rounded hover:bg-gray-700">
                {item.name}
              </Link>
            ) : (
              <button onClick={() => setActiveTab(item.id)} className="w-full text-left p-2 rounded hover:bg-gray-700">
                {item.name}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
    <div className="mt-auto pt-4 border-t border-gray-700">
      <button 
        onClick={handleLogout} 
        className="w-full text-left p-2 rounded hover:bg-red-700 bg-red-600 text-white font-bold"
      >
        Sair
      </button>
    </div>
  </div>
);

const Header = ({ sidebarOpen, setSidebarOpen, searchTerm, setSearchTerm }) => (
  <header className="bg-white shadow-sm p-4 flex items-center justify-between">
    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-600">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
    <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
    <input
      type="text"
      placeholder="Pesquisar..."
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </header>
);

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', path: '/dashboard' },
    { id: 'appointments', name: 'Agendamentos' },
    { id: 'patients', name: 'Pacientes', path: '/clients' },
    { id: 'settings', name: 'Configurações' },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={menuItems}
        handleLogout={handleLogout}
      />
      <div className="flex-1 overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <main className="p-6 overflow-y-auto h-full">
          {children}
        </main>
      </div>
    </div>
  );
}