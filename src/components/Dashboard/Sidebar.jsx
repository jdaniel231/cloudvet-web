import React from "react";
import { Heart } from "lucide-react";

const Sidebar = ({ sidebarOpen, activeTab, setActiveTab, menuItems }) => (
  <div
    className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}
  >
    <div className="p-6">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-500 p-2 rounded-lg">
          {/* <Heart className="h-6 w-6 text-white" /> */}
        </div>
        {sidebarOpen && (
          <div>
            <h1 className="text-xl font-bold text-gray-800">VetCare</h1>
            <p className="text-sm text-gray-500">Clínica Veterinária</p>
          </div>
        )}
      </div>
    </div>

    <nav className="mt-6">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
            activeTab === item.id
              ? "bg-blue-50 border-r-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
        >
          <item.icon className="h-5 w-5" />
          {sidebarOpen && <span>{item.label}</span>}
        </button>
      ))}
    </nav>
  </div>
);

export default Sidebar;
