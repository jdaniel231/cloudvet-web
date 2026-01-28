import { useState, useEffect } from "react";
import { Ticket, Send, X, AlertCircle, LayoutGrid, Trash2, Minus, Plus } from "lucide-react";
import { getClinicServices } from "../../services/clinicService";
import DataTable from "../common/DataTable";

export const TicketForm = ({ initialData = {}, onSubmit, onCancel, isLoading }) => {
  const data = initialData || {};
  const [formData, setFormData] = useState({

  });

  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [deletedItemsIds, setDeletedItemsIds] = useState([]); // IDs dos itens originais que foram removidos
  const [loadingServices, setLoadingServices] = useState(true);

  // Sincroniza dados iniciais (Edição)
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        subject: data.subject || "",
        category: data.category || "Médico",
        priority: data.priority || "Média",
        description: data.description || "",
      });

      if (data.ticket_items && data.ticket_items.length > 0) {
        // Mapeia os itens do ticket vindos da API para o formato esperado pela tabela
        const mappedItems = data.ticket_items.map(item => {
          // Alguns backends podem usar nomes diferentes para o ID de referência
          const referenceId =
            item.reference_id ??
            item.service_id ??
            item.clinic_service_id ??
            item.id;

          // Tenta pegar o nome correto do serviço associado ao ticket item
          const serviceName =
            item.description ||
            item.clinic_service?.name ||
            item.service?.name ||
            item.name ||
            "Serviço";

          return {
            rowId: `saved_${item.id}`, // ID único para a linha na UI
            id: referenceId, // ID do serviço usado como "Ref"
            ticket_item_id: item.id, // ID real no banco de dados
            name: serviceName,
            total_value: item.unit_price || item.price || 0,
            quantity: item.quantity || 1,
            discount: item.discount || 0,
          };
        });
        setSelectedServices(mappedItems);
        setDeletedItemsIds([]); // Reseta ao carregar novos dados
      }
    }
  }, [data]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const services = await getClinicServices();
        setAvailableServices(services || []);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
      } finally {
        setLoadingServices(false);
      }
    };
    loadServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddService = (serviceId) => {
    if (!serviceId) return;
    const service = availableServices.find(s => String(s.id) === String(serviceId));
    // Permitir adicionar o mesmo serviço se quiser (mas a UI já bloqueia duplos simples)
    // Para garantir unicidade de rowId, usamos timestamp + random
    const rowId = `new_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    setSelectedServices([...selectedServices, { ...service, rowId, quantity: 1, discount: 0 }]);
  };

  const handleUpdateQuantity = (rowId, delta) => {
    setSelectedServices(prev => prev.map(item => {
      if (item.rowId === rowId) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleUpdateDiscount = (rowId, value) => {
    const discount = parseFloat(value) || 0;
    setSelectedServices(prev => prev.map(item => {
      if (item.rowId === rowId) {
        // Garantir que o desconto não seja maior que o valor total do serviço
        const safeDiscount = Math.min(Number(item.total_value), Math.max(0, discount));
        return { ...item, discount: safeDiscount };
      }
      return item;
    }));
  };

  const handleRemoveService = (rowId) => {
    const itemToRemove = selectedServices.find(s => s.rowId === rowId);
    if (itemToRemove?.ticket_item_id) {
      // Se era um item que já existia no banco, guarda o ID para deletar via _destroy
      setDeletedItemsIds(prev => [...prev, itemToRemove.ticket_item_id]);
    }
    setSelectedServices(selectedServices.filter(s => s.rowId !== rowId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Formata os itens ativos e os removidos (_destroy) para o Rails
    const activeItems = selectedServices.map(s => ({
      id: s.ticket_item_id, // Importante para o Rails saber se cria ou atualiza
      reference_id: s.id,
      unit_price: s.total_value,
      quantity: s.quantity || 1,
      discount: s.discount || 0
    }));

    const destroyedItems = deletedItemsIds.map(id => ({
      id,
      _destroy: true
    }));

    const payload = {
      ...formData,
      ticket_items_attributes: [...activeItems, ...destroyedItems]
    };

    onSubmit(payload);
  };

  const totalValue = selectedServices.reduce((sum, s) => {
    const itemSubtotal = (Number(s.total_value || 0) - Number(s.discount || 0)) * (s.quantity || 1);
    return sum + itemSubtotal;
  }, 0);

  const columns = [
    {
      header: "Serviço",
      key: "name",
      render: (service) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-700">{service.name || service.description || "Serviço"}</span>
          {/* <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
            Ref: #{service.id ?? service.reference_id ?? "-"}
          </span> */}
        </div>
      ),
    },
    {
      header: "Valor Unit.",
      key: "total_value",
      render: (service) => (
        <span className="text-sm font-medium text-slate-600">
          R$ {Number(service.total_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      header: "Desconto",
      key: "discount",
      render: (service) => (
        <div className="relative w-32 group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-rose-400 group-focus-within:text-rose-600 transition-colors">R$</span>
          <input
            type="number"
            value={service.discount || ""}
            placeholder="0,00"
            onChange={(e) => handleUpdateDiscount(service.rowId, e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-rose-50/30 border border-rose-100 rounded-lg text-sm font-bold text-rose-600 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 outline-none transition-all placeholder:text-rose-300"
          />
        </div>
      ),
    },
    {
      header: "Quantidade",
      key: "quantity",
      align: "center",
      render: (service) => (
        <div className="inline-flex items-center gap-3 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => handleUpdateQuantity(service.rowId, -1)}
            className="p-1.5 hover:bg-white text-slate-400 hover:text-indigo-600 rounded-lg transition-all shadow-sm active:scale-95"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center font-black text-slate-700 text-sm">{service.quantity || 1}</span>
          <button
            type="button"
            onClick={() => handleUpdateQuantity(service.rowId, 1)}
            className="p-1.5 hover:bg-white text-slate-400 hover:text-indigo-600 rounded-lg transition-all shadow-sm active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
    {
      header: "Subtotal",
      align: "right",
      render: (service) => {
        const subtotal = (Number(service.total_value) - Number(service.discount || 0)) * (service.quantity || 1);
        return (
          <span className="text-sm font-black text-slate-800">
            R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        );
      },
    },
    {
      header: "",
      align: "right",
      render: (service) => (
        <button
          type="button"
          onClick={() => handleRemoveService(service.rowId)}
          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all group"
          title="Remover Item"
        >
          <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
        </button>
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Seleção de Serviços */}
        <div className="space-y-4">
          <label className="block text-sm font-extrabold text-slate-700 mb-2 flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-indigo-500" />
            Adicionar Serviços ao Ticket
          </label>

          <div className="flex gap-2">
            <select
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-400 focus:bg-white transition-all font-bold text-slate-700 disabled:opacity-50 shadow-inner"
              onChange={(e) => handleAddService(e.target.value)}
              value=""
              disabled={loadingServices}
            >
              <option value="" disabled>Pesquise ou selecione um serviço...</option>
              {availableServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - R$ {Number(service.total_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </option>
              ))}
            </select>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <DataTable
              columns={columns}
              data={selectedServices}
              loading={loadingServices}
              emptyMessage="Nenhum serviço selecionado."
              emptyIcon={LayoutGrid}
            />
          </div>
        </div>
      </div>

      {/* Resumo Financeiro */}
      {selectedServices.length > 0 && (
        <div className="bg-slate-900 text-white p-6 rounded-[2rem] flex items-center justify-between shadow-2xl shadow-indigo-900/40 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Ticket className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-black text-indigo-400/80">Valor Final do Ticket</p>
              <p className="text-sm font-medium text-slate-300">{selectedServices.length} serviços incluídos</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black tracking-tighter text-white">
              <span className="text-indigo-400 text-sm font-bold mr-1">R$</span>
              {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      )}
      <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 font-bold py-4 px-10 rounded-[1.5rem] hover:bg-slate-50 transition-all active:scale-[0.98]"
        >
          <X className="h-4 w-4" />
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading || selectedServices.length === 0}
          className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-8 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-bold tracking-wide"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Send className="h-5 w-5" />
          )}
          {isLoading ? "Abrindo Ticket..." : "Registrar Ticket"}
        </button>

      </div>
    </form>
  );
};