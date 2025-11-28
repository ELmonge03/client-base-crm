// pages/proyectos.js
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit, FaSave } from 'react-icons/fa'; 
import ProyectoCard from '@/components/ProyectoCard';

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [clientes, setClientes] = useState([]);
  
  // Estado del formulario
  const [form, setForm] = useState({ nombre: '', descripcion: '', status: 'Pendiente', clienteId: '' });
  const [cargando, setCargando] = useState(false);
  
  // Estado para saber si estamos editando
  const [proyectoEditando, setProyectoEditando] = useState(null);

  useEffect(() => { cargarDatos(); }, []);

  const cargarDatos = async () => {
    try {
      const [resProy, resCli] = await Promise.all([
        fetch('/api/proyectos'),
        fetch('/api/clientes')
      ]);
      setProyectos(await resProy.json());
      setClientes(await resCli.json());
    } catch(e) { toast.error("Error cargando datos"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.clienteId) return toast.warning("Debes seleccionar un cliente");
    
    setCargando(true);

    try {
      if (proyectoEditando) {
        // --- MODO EDICIÓN (PUT) ---
        const res = await fetch(`/api/proyectos/${proyectoEditando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if(res.ok) toast.success("Proyecto actualizado correctamente");
        else toast.error("Error al actualizar");

      } else {
        // --- MODO CREACIÓN (POST) ---
        const res = await fetch('/api/proyectos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if(res.ok) toast.success("Proyecto creado exitosamente");
        else toast.error("Error al crear");
      }

      // Limpiar formulario y recargar
      cancelarEdicion();
      cargarDatos();

    } catch (error) {
      toast.error("Error de conexión");
    }
    setCargando(false);
  };

 const eliminarProyecto = async (proy) => {
    // 1. EL CUADRO GRIS (Feo pero funcional)
    const confirmacion = confirm(`¿Estás seguro de eliminar el proyecto "${proy.nombre}"?`);
    
    if(!confirmacion) return; // Si dice Cancelar, no hacemos nada

    // 2. BORRADO
    try {
      const res = await fetch(`/api/proyectos/${proy.id}`, { method: 'DELETE' });
      
      if (res.ok) {
        // 3. ÉXITO
        toast.success(`Proyecto "${proy.nombre}" eliminado`);
        cargarDatos();
      } else {
        toast.error("No se pudo eliminar.");
      }
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  //Funciones para Editar
  const cargarParaEditar = (proyecto) => {
    setProyectoEditando(proyecto);
    setForm({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion || '',
      status: proyecto.status,
      clienteId: proyecto.clienteId // Prisma nos devuelve esto
    });
    toast.info(`Editando: ${proyecto.nombre}`);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setProyectoEditando(null);
    setForm({ nombre: '', descripcion: '', status: 'Pendiente', clienteId: '' });
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Terminado': return 'bg-emerald-900/50 text-emerald-400 border-emerald-700';
      case 'En Progreso': return 'bg-blue-900/50 text-blue-400 border-blue-700';
      default: return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
    }
  };

  return (
    <Layout titulo="Gestión de Proyectos">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- FORMULARIO LATERAL --- */}
        <div className="lg:col-span-1">
          <div className={`p-6 rounded-xl shadow-lg border sticky top-6 transition-colors ${
            proyectoEditando ? 'bg-blue-900/20 border-blue-500/50' : 'bg-slate-800 border-slate-700'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                {proyectoEditando ? <FaEdit className="text-blue-400"/> : <FaPlus className="text-green-400"/>}
                {proyectoEditando ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </h2>
              {proyectoEditando && (
                <button onClick={cancelarEdicion} className="text-sm text-slate-400 hover:text-white underline">
                  Cancelar
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nombre del Proyecto" required
                value={form.nombre}
                onChange={e => setForm({...form, nombre: e.target.value})}
              />
              
              <select 
                className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
                value={form.clienteId}
                onChange={e => setForm({...form, clienteId: e.target.value})}
              >
                <option value="">-- Asignar a Cliente --</option>
                {clientes.map(cli => (
                  <option key={cli.id} value={cli.id}>{cli.nombre}</option>
                ))}
              </select>

              <textarea
                className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                placeholder="Descripción..."
                value={form.descripcion}
                onChange={e => setForm({...form, descripcion: e.target.value})}
              />

              <select 
                className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.status}
                onChange={e => setForm({...form, status: e.target.value})}
              >
                <option>Pendiente</option>
                <option>En Progreso</option>
                <option>Terminado</option>
              </select>

              <button type="submit" disabled={cargando} className={`font-bold py-3 rounded-lg transition-all shadow-lg mt-2 flex justify-center items-center gap-2 ${
                proyectoEditando ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-green-600 hover:bg-green-500 text-white'
              }`}>
                <FaSave/> {cargando ? 'Guardando...' : (proyectoEditando ? 'Actualizar Proyecto' : 'Crear Proyecto')}
              </button>
            </form>
          </div>
        </div>

        {/* --- GRID DE PROYECTOS --- */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {proyectos.length === 0 ? (
            <div className="col-span-2 text-center text-slate-500 mt-10 p-10 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
              No hay proyectos activos. ¡Crea el primero!
            </div>
          ) : (
            proyectos.map((proy) => (
              <ProyectoCard
                key={proy.id}
                proyecto={proy}
                onEdit={cargarParaEditar}
                onDelete={eliminarProyecto}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}