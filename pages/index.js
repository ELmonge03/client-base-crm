// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [clientes, setClientes] = useState([]);
  // Estado para el formulario
  const [form, setForm] = useState({ nombre: '', email: '', empresa: '', telefono: '' });
  const [cargando, setCargando] = useState(false);
  // Estado para saber si estamos editando (guardamos el ID del que se edita)
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    const res = await fetch('/api/clientes');
    const data = await res.json();
    setClientes(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- FUNCIÓN INTELIGENTE: CREAR O ACTUALIZAR ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      if (clienteEditando) {
        // MODO EDICIÓN (PUT)
        await fetch(`/api/clientes/${clienteEditando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        alert('¡Cliente actualizado!');
      } else {
        // MODO CREACIÓN (POST)
        await fetch('/api/clientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        alert('¡Cliente creado!');
      }

      // Limpiar todo después de guardar
      setForm({ nombre: '', email: '', empresa: '', telefono: '' });
      setClienteEditando(null);
      cargarClientes();
      
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error');
    }
    setCargando(false);
  };

  // --- FUNCIÓN BORRAR ---
  const deleteCliente = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este cliente?')) return;

    try {
      await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
      cargarClientes(); // Recargar la lista
    } catch (error) {
      console.error(error);
    }
  };

  // --- FUNCIÓN PREPARAR EDICIÓN ---
  const cargarDatosParaEditar = (cliente) => {
    setForm({ 
      nombre: cliente.nombre, 
      email: cliente.email, 
      empresa: cliente.empresa, 
      telefono: cliente.telefono || '' 
    });
    setClienteEditando(cliente);
    // Hacemos scroll hacia arriba suavemente para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setForm({ nombre: '', email: '', empresa: '', telefono: '' });
    setClienteEditando(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
          ClientBase CRM 🚀
        </h1>

        {/* --- FORMULARIO --- */}
        <div className={`p-8 rounded-xl shadow-lg mb-10 border transition-colors ${clienteEditando ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-700">
              {clienteEditando ? '✏️ Editando Cliente' : '➕ Agregar Nuevo Cliente'}
            </h2>
            {clienteEditando && (
              <button onClick={cancelarEdicion} className="text-sm text-gray-500 underline hover:text-gray-800">
                Cancelar Edición
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              name="nombre" placeholder="Nombre Completo" required
              value={form.nombre} onChange={handleChange}
            />
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              name="email" type="email" placeholder="Correo Electrónico" required
              value={form.email} onChange={handleChange}
            />
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              name="empresa" placeholder="Empresa / Negocio" required
              value={form.empresa} onChange={handleChange}
            />
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              name="telefono" placeholder="Teléfono"
              value={form.telefono} onChange={handleChange}
            />
            <button 
              type="submit" 
              disabled={cargando}
              className={`md:col-span-2 text-white font-bold py-3 rounded-lg transition-colors ${clienteEditando ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {cargando ? 'Procesando...' : (clienteEditando ? 'Guardar Cambios' : 'Guardar Cliente')}
            </button>
          </form>
        </div>

        {/* --- TABLA DE DATOS --- */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          <div className="bg-slate-50 p-4 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-700">Cartera de Clientes ({clientes.length})</h2>
          </div>
          
          {clientes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay clientes registrados aún.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 uppercase text-sm font-semibold">
                  <tr>
                    <th className="p-4">Nombre</th>
                    <th className="p-4">Empresa</th>
                    <th className="p-4">Contacto</th>
                    <th className="p-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clientes.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-slate-50 transition-colors text-black">
                      <td className="p-4 font-medium">{cliente.nombre}</td>
                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs font-bold">
                          {cliente.empresa}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        <div>{cliente.email}</div>
                        <div>{cliente.telefono}</div>
                      </td>
                      <td className="p-4 text-center space-x-2">
                        <button 
                          onClick={() => cargarDatosParaEditar(cliente)}
                          className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm font-bold hover:bg-yellow-200"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => deleteCliente(cliente.id)}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-bold hover:bg-red-200"
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}