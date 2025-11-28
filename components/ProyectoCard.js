import { FaEdit, FaTrash } from 'react-icons/fa';

export default function ProyectoCard({ proyecto, onEdit, onDelete }) {
  
  // Lógica de estilos interna del componente
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Terminado': return 'bg-emerald-900/50 text-emerald-400 border-emerald-700';
      case 'En Progreso': return 'bg-blue-900/50 text-blue-400 border-blue-700';
      default: return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
    }
  };

  return (
    <div className={`bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg hover:shadow-2xl hover:border-slate-600 transition-all group relative overflow-hidden`}>
      {/* Barra lateral de color según estado */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
         proyecto.status === 'Terminado' ? 'bg-emerald-500' : 
         proyecto.status === 'En Progreso' ? 'bg-blue-500' : 'bg-yellow-500'
      }`}></div>

      <div className="flex justify-between items-start mb-3 pl-2">
        <h3 className="font-bold text-lg text-slate-100 group-hover:text-blue-400 transition-colors">
          {proyecto.nombre}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full font-bold border ${getStatusStyle(proyecto.status)}`}>
          {proyecto.status}
        </span>
      </div>
      
      <p className="text-sm text-slate-400 mb-6 pl-2 line-clamp-2 min-h-[40px]">
        {proyecto.descripcion || "Sin descripción disponible."}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-700 pl-2">
        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700">
          👤 {proyecto.cliente.nombre}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(proyecto)}
            className="p-2 bg-blue-900/30 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-all"
            title="Editar Proyecto"
          >
            <FaEdit />
          </button>
          <button 
            onClick={() => onDelete(proyecto)}
            className="p-2 bg-red-900/30 text-red-400 rounded hover:bg-red-600 hover:text-white transition-all"
            title="Eliminar Proyecto"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}