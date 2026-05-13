import { useState } from 'react';

export default function CourseForm({ onSubmit }) {
  const [form, setForm] = useState({ codigo: '', nome: '', instrutor: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
      setForm({ codigo: '', nome: '', instrutor: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Cadastrar Novo Curso</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
          <input
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            required
            placeholder="Ex: CS101"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Curso</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="Ex: Introdução à Programação"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instrutor</label>
          <input
            name="instrutor"
            value={form.instrutor}
            onChange={handleChange}
            required
            placeholder="Ex: Prof. João Silva"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:col-span-3 flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white px-5 py-2 rounded text-sm font-semibold hover:bg-blue-800 disabled:opacity-60 transition"
          >
            {loading ? 'Salvando...' : 'Cadastrar'}
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
