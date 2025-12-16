import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClientById } from "../../services/client";
import { getAnimalById } from "../../services/animal";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import {
  PlusCircle,
  HospitalIcon,
  UserRound,
  Dog,
  DollarSign,
  Eye,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  Menu,
  LogOut,
  Cloud,
  ChevronDown,
  ChevronRight,
  Syringe,
  FilePlus,
} from "lucide-react";
import Breadcrumbs from "../common/Breadcrumbs";

const Sidebar = ({
  sidebarOpen,
  activeTab,
  setActiveTab,
  menuItems,
  handleLogout,
  toggleSidebar,
}) => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (itemId) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div
      className={`flex flex-col h-screen transition-all duration-500 ease-out ${sidebarOpen ? "w-72" : "w-20"
        } bg-gradient-to-b from-cyan-900 to-cyan-950 text-white shadow-premium relative overflow-hidden`}
    >
      {/* Decorative Elements for Premium Feel */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent opacity-50"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between p-6 z-10">
        {sidebarOpen && (
          <h2 className="text-2xl font-light tracking-wide flex items-center">
            <div className="bg-white/10 p-2 rounded-xl mr-3 backdrop-blur-md border border-white/10">
              <Cloud className="h-6 w-6 text-accent" />
            </div>
            <span className="font-semibold text-white">Cloud<span className="font-light text-accent">Vet</span></span>
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white/60 hover:text-accent p-2 rounded-lg transition-colors focus:outline-none"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto z-10">
        <p className={`text-xs font-semibold text-white/30 uppercase tracking-widest px-4 mb-4 ${!sidebarOpen && "hidden"}`}>Menu Principal</p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.submenu ? (
                // Submenu Parent Item
                <>
                  <button
                    onClick={() => toggleSubmenu(item.id)}
                    className={`flex items-center justify-between w-full p-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden 
                      ${openSubmenus[item.id] ? "bg-white/10 text-white" : "text-slate-300 hover:text-white hover:bg-white/5"}
                    `}
                  >
                    <div className="flex items-center">
                      <div className={`${openSubmenus[item.id] ? "text-accent" : "text-slate-400 group-hover:text-white transition-colors"}`}>
                        {item.icon}
                      </div>
                      {sidebarOpen && <span className="ml-3 font-medium text-sm tracking-wide">{item.name}</span>}
                    </div>
                    {sidebarOpen && (
                      openSubmenus[item.id] ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </button>

                  {/* Submenu Children */}
                  {sidebarOpen && openSubmenus[item.id] && (
                    <div className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-2 animate-in slide-in-from-top-2 duration-200">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`flex items-center p-2.5 rounded-lg transition-all duration-200 text-sm
                            ${window.location.pathname.startsWith(subItem.path)
                              ? "text-accent bg-white/5 font-medium"
                              : "text-slate-400 hover:text-white hover:bg-white/5"}
                          `}
                        >
                          <div className="mr-3 opacity-70">{subItem.icon}</div>
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : item.path ? (
                // Standard Link Item
                <Link
                  to={item.path}
                  className={`flex items-center p-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${window.location.pathname.startsWith(item.path)
                    ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/5"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {window.location.pathname.startsWith(item.path) && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                  )}
                  <div className={`${window.location.pathname.startsWith(item.path) ? "text-accent" : "text-slate-400 group-hover:text-white transition-colors"}`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && <span className="ml-3 font-medium text-sm tracking-wide">{item.name}</span>}
                </Link>
              ) : (
                // Action Button Item
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full text-left p-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeTab === item.id
                    ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/5"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {activeTab === item.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                  )}
                  <div className={`${activeTab === item.id ? "text-accent" : "text-slate-400 group-hover:text-white transition-colors"}`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && <span className="ml-3 font-medium text-sm tracking-wide">{item.name}</span>}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-white/5 z-10">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left p-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all duration-300 group"
        >
          <LogOut className="h-5 w-5" />
          {sidebarOpen && <span className="ml-3 font-medium text-sm">Sair do Sistema</span>}
        </button>
      </div>
    </div>
  );
};

const Header = ({ searchTerm, setSearchTerm, nameMap }) => (
  <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-8 py-4 flex items-center justify-between border-b border-slate-100/50">
    <div className="flex items-center">
      <Breadcrumbs nameMap={nameMap} />
    </div>
    <div className="flex items-center space-x-6">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Eye className="h-4 w-4 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Buscar..."
          className="pl-10 pr-4 py-2 bg-slate-100/50 border border-transparent focus:bg-white rounded-lg w-64 focus:w-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-200 text-sm text-slate-700 placeholder-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-xs ring-2 ring-white shadow-sm">
        AD
      </div>
    </div>
  </header>
);

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar starts open
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [nameMap, setNameMap] = useState({});
  const navigate = useNavigate();
  const { clientId, animalId } = useParams();

  useEffect(() => {
    const fetchNames = async () => {
      const newNameMap = {};
      if (clientId) {
        try {
          const client = await getClientById(clientId);
          newNameMap[clientId] = client.name;
        } catch (error) {
          console.error("Error fetching client name:", error);
        }
      }
      if (animalId) {
        try {
          const animal = await getAnimalById(clientId, animalId);
          newNameMap[animalId] = animal.name;
        } catch (error) {
          console.error("Error fetching animal name:", error);
        }
      }
      setNameMap(newNameMap);
    };

    fetchNames();
  }, [clientId, animalId]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "appointments",
      name: "Agendamentos",
      path: "/appointments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "patients",
      name: "Pacientes",
      path: "/clients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "register",
      name: "Cadastrar",
      icon: <FilePlus className="h-5 w-5" />,
      submenu: [
        {
          name: "Tipos de Vacinas",
          path: "/vaccine_types",
          icon: <Syringe className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "settings",
      name: "Configurações",
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden font-sans">
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={menuItems}
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden relative">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          nameMap={nameMap}
        />
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
