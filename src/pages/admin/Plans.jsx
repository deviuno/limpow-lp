import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2,
  AlertTriangle,
  X,
  Loader2,
  Save,
  Check
} from 'lucide-react';
import { getPlans, createPlan, updatePlan, deletePlan } from '../../lib/plans';

function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    features: [],
    max_debt: null,
    support_type: '',
    deadline: 0,
    button_url: '',
    highlighted: false
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await getPlans();
      if (error) throw error;
      setPlans(data);
    } catch (err) {
      setError('Erro ao carregar planos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const planData = {
        ...formData,
        price: parseInt(formData.price * 100), // Convert to cents
        max_debt: formData.max_debt ? parseInt(formData.max_debt * 100) : null,
        deadline: parseInt(formData.deadline)
      };

      const { data, error } = editingPlan
        ? await updatePlan(editingPlan.id, planData)
        : await createPlan(planData);

      if (error) throw error;

      await fetchPlans();
      setShowForm(false);
      setEditingPlan(null);
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      ...plan,
      price: plan.price / 100, // Convert from cents
      max_debt: plan.max_debt ? plan.max_debt / 100 : null,
      features: plan.features || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este plano?')) return;

    try {
      const { error } = await deletePlan(id);
      if (error) throw error;
      await fetchPlans();
    } catch (err) {
      setError('Erro ao excluir plano');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      features: [],
      max_debt: null,
      support_type: '',
      deadline: 0,
      button_url: '',
      highlighted: false
    });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planos</h1>
          <p className="text-gray-600">Gerencie os planos exibidos na página inicial</p>
        </div>
        <button 
          onClick={() => {
            resetForm();
            setEditingPlan(null);
            setShowForm(true);
          }}
          className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Plano
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Plans Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPlan ? 'Editar Plano' : 'Novo Plano'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  required
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Máximo da Dívida (R$)
                </label>
                <input
                  type="number"
                  value={formData.max_debt || ''}
                  onChange={(e) => setFormData({ ...formData, max_debt: e.target.value ? parseFloat(e.target.value) : null })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  step="0.01"
                  placeholder="Deixe em branco para sem limite"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Suporte
                </label>
                <select
                  value={formData.support_type}
                  onChange={(e) => setFormData({ ...formData, support_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="email">Email</option>
                  <option value="priority">Prioritário</option>
                  <option value="vip">VIP 24/7</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prazo (dias)
                </label>
                <input
                  type="number"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL do Botão
                </label>
                <input
                  type="url"
                  value={formData.button_url}
                  onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.highlighted}
                    onChange={(e) => setFormData({ ...formData, highlighted: e.target.checked })}
                    className="rounded text-[#11CD80] focus:ring-[#11CD80]"
                  />
                  Plano em Destaque
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Características
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                        placeholder="Característica do plano"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-[#11CD80] text-sm font-medium hover:text-[#0fb46f]"
                  >
                    + Adicionar Característica
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Salvar Plano
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Plans Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#11CD80] animate-spin" />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum plano cadastrado</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`
                bg-white rounded-xl p-6 shadow-sm border-2
                ${plan.highlighted ? 'border-[#11CD80]' : 'border-gray-100'}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-2xl font-bold text-[#11CD80]">
                    R$ {(plan.price / 100).toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-[#11CD80]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-sm text-gray-500">
                <p>Suporte: {plan.support_type}</p>
                <p>Prazo: {plan.deadline} dias</p>
                {plan.max_debt && (
                  <p>Dívida máxima: R$ {(plan.max_debt / 100).toFixed(2)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Plans;