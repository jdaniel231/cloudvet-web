import React from "react";
import { TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-premium transition-all duration-500 border border-slate-100 hover:border-cyan-100 group relative overflow-hidden">
    {/* Subtle decorative background blob */}
    <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-50 rounded-full blur-2xl group-hover:bg-cyan-100 transition-colors duration-500"></div>

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{title}</p>
        <p className="text-4xl font-light text-slate-800 tracking-tight">{value}</p>
        <div className="flex items-center mt-3">
          {trend && (
            <>
              <div className="bg-emerald-50 p-0.5 rounded-full mr-1.5">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              </div>
              <span className="text-xs font-medium text-emerald-600">{trend}</span>
            </>
          )}
        </div>
      </div>
      <div className={`p-4 rounded-xl ${color.replace('bg-', 'bg-opacity-10 text-')} bg-opacity-10 text-${color.replace('bg-', '')}-600 ring-1 ring-inset ring-black/5`}>
        {/* Note: This assumes 'color' prop passed is like 'bg-blue-500'. We might need to adjust logic if it's different. 
            For now, let's just make a clean icon container 
        */}
        <Icon className="h-7 w-7 text-cyan-700" />
      </div>
    </div>
  </div>
);

export default StatCard;
