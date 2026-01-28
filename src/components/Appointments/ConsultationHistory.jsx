
import React, { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Plus,
  Stethoscope,
  User,
  Clock,
  ChevronRight,
  Eye,
  Pen,
  Trash,
  Search,
  CheckCircle2
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAppointmentsByAnimal,
  deleteAppointment,
  getAppointmentById,
} from "../../services/appoint";
import Modal from "../common/Modal";
import AppointmentDetails from "./AppointmentDetails";

const ConsultationHistory = () => {
  const { clientId, animalId } = useParams();
  const [consultations, setConsultations] = useState([]);
  const navigate = useNavigate();

  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
    type: "confirmation" // Added type support
  });

  const [viewModalState, setViewModalState] = useState({
    show: false,
    appointment: null,
  });

  const fetchConsultations = useCallback(async () => {
    try {
      const consultationsData = await getAppointmentsByAnimal(animalId);
      // Sort by date descending
      const sorted = consultationsData?.sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      ) || [];
      setConsultations(sorted);
    } catch (err) {
      console.error(err);
    }
  }, [animalId]);

  useEffect(() => {
    if (animalId) {
      fetchConsultations();
    }
  }, [animalId, fetchConsultations]);

  const handleView = async (appointmentId) => {
    try {
      const appointmentData = await getAppointmentById(appointmentId);
      setViewModalState({ show: true, appointment: appointmentData });
    } catch (error) {
      console.error("Erro ao buscar detalhes da consulta:", error);
      setModalState({
        show: true,
        title: "Erro!",
        message: "Ocorreu um erro ao buscar os detalhes da consulta.",
        onConfirm: null,
        type: "error"
      });
    }
  };

  const handleDelete = async (appointmentId) => {
    setModalState({
      show: true,
      title: "Confirmar Exclusão",
      message: "Tem certeza que deseja excluir esta consulta?",
      type: "confirmation",
      onConfirm: async () => {
        try {
          await deleteAppointment(appointmentId);
          fetchConsultations();
          setModalState({
            show: false,
            title: "",
            message: "",
            onConfirm: null,
            type: "confirmation"
          });
        } catch (error) {
          console.error("Erro ao excluir consulta:", error);
          setModalState({
            show: true,
            title: "Erro",
            message: "Não foi possível excluir.",
            type: "error"
          });
        }
      },
    });
  };

  const handleCloseModal = () => {
    setModalState({ show: false, title: "", message: "", onConfirm: null, type: "confirmation" });
  };

  const handleCloseViewModal = () => {
    setViewModalState({ show: false, appointment: null });
  };

  return (
    <div className="space-y-6">
      {/* Header with Search/Add */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg shadow-lg shadow-cyan-500/20 text-white">
              <Stethoscope className="h-5 w-5" />
            </div>
            Histórico de Consultas
          </h3>
          <p className="text-slate-500 text-sm mt-1 ml-11">
            Acompanhe a evolução clínica do paciente
          </p>
        </div>

        <button
          onClick={() => navigate(`/clients/${clientId}/animals/${animalId}/appointments/new`)}
          className="group flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <span className="font-semibold text-sm">Nova Consulta</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 min-h-[400px]">
        {consultations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Calendar className="h-8 w-8 text-slate-300" />
            </div>
            <h4 className="text-slate-600 font-semibold mb-1">Nenhuma consulta registrada</h4>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Inicie um novo atendimento clicando no botão "Nova Consulta" acima.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* List Header - Hidden on mobile, visible on desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <div className="col-span-5 pl-2">Tipo / Veterinário</div>
              <div className="col-span-3">Data</div>
              <div className="col-span-2">Horário</div>
              <div className="col-span-2 text-right pr-2">Ações</div>
            </div>

            {/* List Items */}
            <div className="divide-y divide-slate-50">
              {consultations.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors duration-200"
                >
                  {/* Column 1: Info */}
                  <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm md:text-base">
                        Consulta Clínica
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                        <User className="h-3 w-3" />
                        <span>{item.user?.email || "Veterinário"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Date */}
                  <div className="col-span-6 md:col-span-3">
                    <div className="md:hidden text-xs text-slate-400 mb-1">Data</div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4 text-cyan-500 md:hidden" />
                      <span className="font-medium text-sm">
                        {new Date(item.created_at).toLocaleDateString("pt-BR", {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Column 3: Time */}
                  <div className="col-span-6 md:col-span-2">
                    <div className="md:hidden text-xs text-slate-400 mb-1">Horário</div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="h-4 w-4 text-cyan-500 md:hidden" />
                      <span className="font-medium text-sm">
                        {new Date(item.created_at).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {/* Column 4: Actions */}
                  <div className="col-span-12 md:col-span-2 flex justify-end gap-2">
                    <button
                      onClick={() => handleView(item.id)}
                      className="p-2 text-slate-300 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors md:opacity-0 md:group-hover:opacity-100"
                      title="Ver Detalhes"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <Link
                      to={`/clients/${clientId}/animals/${animalId}/appointments/${item.id}/edit`}
                      className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors md:opacity-0 md:group-hover:opacity-100"
                      title="Editar"
                    >
                      <Pen className="h-4 w-4" />
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors md:opacity-0 md:group-hover:opacity-100"
                      title="Excluir"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div >
                </div >
              ))}
            </div >
          </div >
        )}
      </div >

      {/* Modais */}
      < Modal
        show={modalState.show}
        onClose={handleCloseModal}
        onConfirm={modalState.onConfirm}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type || "confirmation"}
      />
      <Modal show={viewModalState.show} onClose={handleCloseViewModal}>
        <AppointmentDetails
          appointment={viewModalState.appointment}
          clientId={clientId}
          animalId={animalId}
          onClose={handleCloseViewModal}
        />
      </Modal>
    </div >
  );
};

export default ConsultationHistory;
