import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEdit,
  faEye,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAppointments,
  deleteAppointment,
  getAppointmentById,
} from "../../services/appoint";
import Modal from "../common/Modal";
import AppointmentDetails from "./AppointmentDetails";

const ConsultationHistory = () => {
  const { clientId, animalId } = useParams();
  const [consultations, setConsultations] = useState([]);
  // const [loading, setLoading] = useState(true);
  
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const [viewModalState, setViewModalState] = useState({
    show: false,
    appointment: null,
  });

  const navigate = useNavigate();

  const fetchConsultations = useCallback(async () => {
    try {
      // setLoading(true);
      const consultationsData = await getAppointments(clientId, animalId);
      setConsultations(consultationsData);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, [clientId, animalId]);

  useEffect(() => {
    if (clientId && animalId) {
      fetchConsultations();
    }
  }, [clientId, animalId, fetchConsultations]);

  const handleView = async (appointmentId) => {
    try {
      const appointmentData = await getAppointmentById(
        clientId,
        animalId,
        appointmentId,
      );
      setViewModalState({ show: true, appointment: appointmentData });
    } catch (error) {
      console.error("Erro ao buscar detalhes da consulta:", error);
      setModalState({
        show: true,
        title: "Erro!",
        message: "Ocorreu um erro ao buscar os detalhes da consulta.",
        onConfirm: null,
      });
    }
  };

  const handleDelete = async (appointmentId) => {
    setModalState({
      show: true,
      title: "Confirmar Exclusão",
      message: "Tem certeza que deseja excluir esta consulta?",
      onConfirm: async () => {
        try {
          await deleteAppointment(clientId, animalId, appointmentId);
          fetchConsultations(); // Re-fetch consultations after deletion
          setModalState({
            show: false,
            title: "",
            message: "",
            onConfirm: null,
          });
        } catch (error) {
          console.error("Erro ao excluir consulta:", error);
          
        }
      },
    });
  };

  const handleCloseModal = () => {
    setModalState({ show: false, title: "", message: "", onConfirm: null });
  };

  const handleCloseViewModal = () => {
    setViewModalState({ show: false, appointment: null });
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-lg text-lightText">Carregando consultas...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-lg text-red-500">{error}</p>
  //     </div>
  //   );
  // }

  // if (consultations.length === 0) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-lg text-lightText">Nenhuma consulta encontrada.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 space-y-6 bg-card shadow-md rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-text flex items-center">
          <FontAwesomeIcon icon={faCalendar} className="text-primary mr-2" />
          Histórico de Consultas
        </h3>
        <button
          className=" text-secondary px-4 py-2 rounded-md text-sm hover:text-primary transition-colors"
          onClick={() =>
            navigate(
              `/clients/${clientId}/animals/${animalId}/appointments/new`,
            )
          }
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
        </button>
      </div>

      {/* Lista */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
        {consultations.map((item, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg p-4 bg-background hover:bg-muted transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-text">
                  {new Date(item.created_at).toLocaleDateString("pt-BR")}
                </p>
                <p className="text-sm text-lightText">{item.user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleView(item.id)}
                  className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <Link
                  to={`/clients/${clientId}/animals/${animalId}/appointments/${item.id}/edit`}
                  className="bg-secondary hover:bg-secondary-dark text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-accent hover:bg-accent-dark text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modais */}
      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        onConfirm={modalState.onConfirm}
        title={modalState.title}
        message={modalState.message}
        type={modalState.onConfirm ? "confirmation" : "error"}
      />
      <Modal show={viewModalState.show} onClose={handleCloseViewModal}>
        <AppointmentDetails
          appointment={viewModalState.appointment}
          clientId={clientId}
          animalId={animalId}
          onClose={handleCloseViewModal}
        />
      </Modal>
    </div>
  );
};

export default ConsultationHistory;
