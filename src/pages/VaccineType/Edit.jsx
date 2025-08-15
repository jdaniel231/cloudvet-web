import { useEffect, useState } from "react";
import { getVaccineTypeById, updateVaccineType } from "../../services/vaccineType";
import { useNavigate, useParams } from "react-router-dom";
import VaccineTypeForm from "../../components/VaccineTypes/Form";
import Modal from "../../components/common/Modal";

export default function Edit() {

  const { id } = useParams();
  const [vaccineType, setVaccineType] = useState(null);
  const [modalState, setModalState] = useState({
    show: false,
    title: '',
    message: '',
    type: 'success',
  });
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const vaccineTypeData = await getVaccineTypeById(id);
        setVaccineType(vaccineTypeData);
      } catch (err) {
        console.error(err);
      } 
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (vaccineTypeData) => {
    try {
      await updateVaccineType(id, vaccineTypeData);
      console.log('Tipo de vacina atualizado com sucesso!');
      setModalState({
        show: true,
        title: 'Atualização Realizada!',
        message: `Tipo de vacina ${vaccineTypeData.name} atualizado com sucesso!`,
        type: 'success',
      });
    } catch (error) {
      console.error('Erro ao atualizar tipo de vacina:', error);
      setModalState({
        show: true,
        title: 'Erro no Atualizar!',
        message: error.response?.data?.error || 'Ocorreu um erro ao atualizar o tipo de vacina. Tente novamente.',
        type: 'error',
      });
    }
  }

  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    if (modalState.type === 'success') {
      navigate('/vaccine_types');
    }
  };

  const handleCancel = () => {
    navigate('/vaccine_types');
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">Editar Tipo de Vacina</h1>
        <div className="bg-card shadow-md rounded-lg p-6">
          {vaccineType && <VaccineTypeForm initialData={vaccineType} onSubmit={handleSubmit} onCancel={handleCancel} />}
        </div>
      </div>

      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  );
}