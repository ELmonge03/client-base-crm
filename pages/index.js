// pages/index.js
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout'; 
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaSave } from 'react-icons/fa';
import ClienteRow from '@/components/ClienteRow';


export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '', empresa: '', telefono: '' });
  const [cargando, setCargando] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => { cargarClientes(); }, []);

  const cargarClientes = async () => {
    const res = await fetch('/api/clientes');
    const data = await res.json();
    setClientes(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validación de teléfono (solo números y max 15)
    if (name === 'telefono') {
        if (value && !/^\d*$/.test(value)) return;
        if (value.length > 15) return;
    }
    setForm({ ...form, [name]: value });
  };

  const validarFormulario = () => {
    const tieneNumeros = /\d/;
    if (tieneNumeros.test(form.nombre)) {
      toast.warning("El nombre no debe contener números.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.warning("Correo inválido.");
      return false;
    }
    return true;
  };

  //const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      const url = clienteEditando ? `/api/clientes/${clienteEditando.id}` : '/api/clientes';
      const method = clienteEditando ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(clienteEditando ? 'Cliente actualizado' : 'Cliente creado');
        setForm({ nombre: '', email: '', empresa: '', telefono: '' });
        setClienteEditando(null);
        cargarClientes();
      } else {
        toast.error('Error al guardar.');
      }
    } catch (error) { toast.error('Error de conexión.'); }
    setCargando(false);
  };

 const deleteCliente = async (cliente) => {
  const confirmacion = confirm(`¿Estás SEGURO de eliminar al cliente: ${cliente.nombre}?`);
  
  if (!confirmacion) return;

    try {
      const res = await fetch(`/api/clientes/${cliente.id}`, { method: 'DELETE' });
      
      if (res.ok) {
        toast.success(`Cliente ${cliente.nombre} eliminado`);
        cargarClientes();
      } else {
        toast.error("No se pudo eliminar.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cargarDatosParaEditar = (cliente) => {
    setForm(cliente);
    setClienteEditando(cliente);
    toast.info(`Editando a: ${cliente.nombre}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setForm({ nombre: '', email: '', empresa: '', telefono: '' });
    setClienteEditando(null);
  };

  return (
    <Layout titulo="Gestión de Clientes">
      <div className="max-w-4xl">
        
        {/* --- FORMULARIO OSCURO --- */}
        <div className={`p-6 rounded-xl shadow-xl mb-8 border border-slate-700 transition-all ${
          clienteEditando ? 'bg-blue-900/20 border-blue-500/50' : 'bg-slate-800'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              {clienteEditando ? <FaEdit className="text-blue-400"/> : <FaPlus className="text-green-400"/>}
              {clienteEditando ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h3>
            {clienteEditando && (
              <button onClick={cancelarEdicion} className="text-sm text-slate-400 hover:text-white underline">
                Cancelar
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['nombre', 'email', 'empresa', 'telefono'].map((campo) => (
              <input
                key={campo}
                name={campo}
                placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
                value={form[campo] || ''}
                onChange={handleChange}
                required={campo !== 'telefono'}
                className="bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-500"
              />
            ))}
            
            <button 
              type="submit" 
              disabled={cargando}
              className={`md:col-span-2 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                clienteEditando 
                ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
            >
              <FaSave /> {cargando ? 'Procesando...' : (clienteEditando ? 'Actualizar Cliente' : 'Guardar Cliente')}
            </button>
          </form>
        </div>

        {/* --- TABLA OSCURA --- */}
        <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-700">
          {clientes.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              No hay clientes registrados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-slate-400 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Nombre / Empresa</th>
                    <th className="p-4">Contacto</th>
                    <th className="p-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {clientes.map((cliente) => (
                    <ClienteRow
                      key={cliente.id}
                      cliente={cliente}
                      onEdit={cargarDatosParaEditar}
                      onDelete={deleteCliente}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}