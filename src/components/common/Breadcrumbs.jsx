import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = ({ nameMap = {} }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Mapeamento de traduções para nomes de rotas
  const routeNames = {
    dashboard: "Visão Geral",
    appointments: "Agendamentos",
    clients: "Pacientes",
    settings: "Configurações",
    new: "Novo Cadastro",
    edit: "Editar",
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center text-slate-400 hover:text-cyan-600 transition-colors p-1 rounded-md hover:bg-cyan-50"
            title="Dashboard"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          // Ignora a renderização de segmentos específicos que são redundantes
          if (value === "animals") {
            return null;
          }

          // Tenta usar o nameMap (dados dinâmicos) ou o routeNames (traduções) ou o valor original
          let displayValue = nameMap[value] || routeNames[value] || value;

          // Formatação extra para IDs ou valores desconhecidos se necessário
          if (!nameMap[value] && !routeNames[value] && value.length > 20) {
            displayValue = "Detalhes";
          }

          return (
            <li key={to} className="flex items-center">
              <ChevronRight className="h-3 w-3 text-slate-300 mx-1" />
              {isLast ? (
                <span className="text-xs font-bold uppercase tracking-widest text-slate-700 select-none">
                  {displayValue}
                </span>
              ) : (
                <Link
                  to={to}
                  className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-cyan-600 transition-colors hover:underline decoration-cyan-200 underline-offset-4"
                >
                  {displayValue}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
