import React from "react";
import { Dog, Cat, PawPrint, Phone, User, Calendar, Weight, Activity, Syringe } from "lucide-react";

const AnimalHeader = ({ client, animal }) => {
  const getIcon = () => {
    switch (animal.species?.toLowerCase()) {
      case "cachorro":
        return <Dog className="h-10 w-10 text-white" />;
      case "gato":
        return <Cat className="h-10 w-10 text-white" />;
      default:
        return <PawPrint className="h-10 w-10 text-white" />;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-800 to-cyan-950 shadow-premium mb-8 text-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="relative z-10 p-8 flex flex-col lg:flex-row items-center gap-8">
        {/* Avatar Section */}
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center p-1 shadow-lg shadow-cyan-500/20 ring-4 ring-white/10">
            <div className="w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
              {getIcon()}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-800"></div>
        </div>

        {/* Main Info Section */}
        <div className="flex-1 text-center lg:text-left space-y-2">
          <div className="flex flex-col lg:flex-row lg:items-end gap-3 justify-center lg:justify-start">
            <h1 className="text-4xl font-bold tracking-tight text-white">{animal.name}</h1>
            <span className="text-cyan-200 font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-1.5 backdrop-blur-md">
              {animal.species}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 mt-2 border-t border-white/10">
            <div className="flex items-center gap-3 text-slate-300">
              <div className="p-2 rounded-lg bg-white/5">
                <User className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Tutor</p>
                <p className="font-medium text-white">{client.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <div className="p-2 rounded-lg bg-white/5">
                <Phone className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Contato</p>
                <p className="font-medium text-white">{client.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <div className="p-2 rounded-lg bg-white/5">
                <Calendar className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Idade</p>
                <p className="font-medium text-white">{animal.age} anos</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <div className="p-2 rounded-lg bg-white/5">
                <Activity className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Status</p>
                <p className="font-medium text-white">{animal.castrated ? "Castrado" : "Inteiro"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalHeader;
