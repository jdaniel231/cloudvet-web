import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { PlusCircle, HospitalIcon, UserRound, Dog, DollarSign, Eye, LayoutDashboard, Calendar, Users, Settings, Menu, LogOut, Cloud } from 'lucide-react';

const Sidebar = ({ sidebarOpen, activeTab, setActiveTab, menuItems, handleLogout, toggleSidebar }) => (
  <div className={`flex flex-col h-screen transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} bg-primary text-white p-4`}>
    <div className="flex items-center justify-between mb-6">
      {sidebarOpen && <h2 className="text-2xl font-bold flex items-center"><Cloud className="h-8 w-8 mr-2" />CloudVet</h2>}
      <button onClick={toggleSidebar} className="text-white focus:outline-none">
        <Menu className="h-6 w-6" />
      </button>
    </div>
    <nav className="flex-1">
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className={`mb-2 ${activeTab === item.id ? 'font-bold' : ''}`}>
            {item.path ? (
              <Link to={item.path} className="flex items-center p-2 rounded hover:bg-primary-dark">
                {item.icon}
                {sidebarOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            ) : (
              <button onClick={() => setActiveTab(item.id)} className="flex items-center w-full text-left p-2 rounded hover:bg-primary-dark">
                {item.icon}
                {sidebarOpen && <span className="ml-3">{item.name}</span>}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
    <div className="mt-auto pt-4 border-t border-border">
      <button 
        onClick={handleLogout} 
        className="flex items-center w-full text-left p-2 rounded hover:bg-red-700 bg-red-600 text-white font-bold"
      >
        <LogOut className="h-5 w-5" />
        {sidebarOpen && <span className="ml-3">Sair</span>}
      </button>
    </div>
  </div>
);

const Header = ({ searchTerm, setSearchTerm }) => (
  <header className="bg-card shadow-sm p-4 flex items-center justify-between">
    <h1 className="text-xl font-semibold text-text flex items-center">
      <Cloud className="h-6 w-6 mr-2 text-primary" /> Dashboard
    </h1>
    <input
      type="text"
      placeholder="Pesquisar..."
      className="border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </header>
);

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar starts open
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'appointments', name: 'Agendamentos', path: '/appointments', icon: <Calendar className="h-5 w-5" /> },
    { id: 'patients', name: 'Pacientes', path: '/clients', icon: <Users className="h-5 w-5" /> },
    { id: 'settings', name: 'Configurações', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={menuItems}
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 overflow-hidden">
        <Header
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