import React from "react";
import { AlertCircle, Search } from "lucide-react";

/**
 * Componente de Tabela Reutilizável com design premium.
 * 
 * @param {Object[]} columns - Definição das colunas: { header, key, render, align, className, headerClassName }
 * @param {Object[]} data - Lista de dados para exibir
 * @param {boolean} loading - Estado de carregamento
 * @param {string} errorMsg - Mensagem de erro, se houver
 * @param {string} emptyMessage - Mensagem para lista vazia
 * @param {React.Component} emptyIcon - Ícone para lista vazia
 * @param {string} searchTerm - Termo de busca atual (para mensagem de "nenhum resultado")
 */
export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  errorMsg = "",
  emptyMessage = "Nenhum registro encontrado",
  emptyIcon: EmptyIcon = Search,
  searchTerm = "",
}) {
  return (
    <div className="relative min-h-[400px]">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10 transition-all duration-300">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-600"></div>
            <p className="text-slate-500 font-medium animate-pulse">Carregando dados...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {!loading && errorMsg && (
        <div className="flex flex-col items-center justify-center h-64 text-red-500 bg-red-50/50 m-4 rounded-2xl border border-red-100 animate-fadeIn">
          <AlertCircle className="h-10 w-10 mb-3" />
          <p className="font-semibold">{errorMsg}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !errorMsg && data.length === 0 && (
        <div className="flex flex-col items-center justify-center h-80 text-slate-500 animate-fadeIn">
          <div className="bg-slate-100 p-6 rounded-full mb-4 shadow-sm">
            <EmptyIcon className="h-12 w-12 text-slate-400" />
          </div>
          <p className="text-lg font-medium text-slate-600">{emptyMessage}</p>
          <p className="text-sm text-slate-400 mt-1 px-4 text-center">
            {searchTerm
              ? `Nenhum resultado para "${searchTerm}". Tente buscar por outro termo.`
              : "Comece adicionando um novo registro ao sistema."}
          </p>
        </div>
      )}

      {/* Data Table */}
      {!loading && !errorMsg && data.length > 0 && (
        <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider ${col.align === "right" ? "text-right" : "text-left"
                      } ${col.headerClassName || ""}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="group hover:bg-slate-50/80 transition-colors duration-200"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`py-4 px-6 ${col.align === "right" ? "text-right" : "text-left"} ${col.className || ""
                        }`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
