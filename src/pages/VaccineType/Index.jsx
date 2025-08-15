import { useEffect, useState } from "react";
import { deleteVaccineType, getVaccineTypes } from "../../services/vaccineType";
import { Link } from "react-router-dom";
import { Pen, Trash } from "lucide-react";
import Modal from "../../components/common/Modal";

export default function Index() {
  const [vaccineTypes, setVaccineTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
    onConfirm: null,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedVaccineType, setSelectedVaccineType] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getVaccineTypes();
        setVaccineTypes(data || []);
      } catch (err) {
        console.error("Erro ao carregar tipos de vacina:", err);
        setErrorMsg("Não foi possível carregar os tipos de vacina.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCloseModal = () => {
    setModalState({
      show: false,
      title: "",
      message: "",
      type: "success",
      onConfirm: null,
    });
  };

  const handleDelete = (vaccineType) => {
    setSelectedVaccineType(vaccineType);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedVaccineType) return;

    setShowConfirmModal(false);
    try {
      await deleteVaccineType(selectedVaccineType.id);

      // Atualiza lista local removendo o item excluído
      setVaccineTypes((prev) =>
        prev.filter((v) => v.id !== selectedVaccineType.id)
      );

      setModalState({
        show: true,
        title: "Exclusão Realizada!",
        message: `Tipo de vacina ${selectedVaccineType.name} excluído com sucesso!`,
        type: "success",
        onConfirm: null,
      });

      setSelectedVaccineType(null);
    } catch (error) {
      console.error("Erro ao excluir tipo de vacina:", error);
      setModalState({
        show: true,
        title: "Erro ao Excluir!",
        message:
          error.response?.data?.error ||
          "Ocorreu um erro ao excluir o tipo de vacina. Tente novamente.",
        type: "error",
        onConfirm: null,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text">Tipos de Vacina</h1>
        <Link
          to="/vaccine_types/new"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Novo
        </Link>
      </div>

      {/* Conteúdo */}
      <div className="bg-card shadow-md rounded-lg p-6 min-h-[120px]">
        {loading && <p className="text-lightText italic">Carregando...</p>}

        {!loading && errorMsg && <p className="text-red-500">{errorMsg}</p>}

        {!loading && !errorMsg && vaccineTypes.length === 0 && (
          <p className="text-lightText">Nenhum tipo de vacina encontrado.</p>
        )}

        {!loading && !errorMsg && vaccineTypes.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-card">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-border bg-background text-left text-xs font-semibold text-lightText uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="py-2 px-4 border-b border-border bg-background"></th>
                </tr>
              </thead>
              <tbody>
                {vaccineTypes.map((vaccineType) => (
                  <tr key={vaccineType.id} className="hover:bg-background">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <p className="text-lg font-semibold text-text">
                        {vaccineType.name}
                      </p>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {/* Botão Editar */}
                        <Link
                          to={`/vaccine_types/${vaccineType.id}/edit`}
                          className="flex items-center bg-secondary hover:bg-secondary-dark text-white font-bold py-1.5 px-3 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                          <Pen className="mr-1" size={16} />
                        </Link>

                        {/* Botão Excluir */}
                        <button
                          onClick={() => handleDelete(vaccineType)}
                          className="flex items-center bg-accent hover:bg-accent-dark text-white font-bold py-1.5 px-3 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                          <Trash className="mr-1" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de feedback */}
      <Modal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        onConfirm={modalState.onConfirm}
      />

      {/* Modal de confirmação */}
      <Modal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o tipo de vacina ${selectedVaccineType?.name}? Esta ação não pode ser desfeita.`}
        type="confirmation"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
