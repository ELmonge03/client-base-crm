import { FaEdit, FaTrash } from 'react-icons/fa';

export default function ClienteRow({ cliente, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-slate-700/50 transition-colors border-b border-slate-700 last:border-0">
      <td className="p-4">
        <div className="font-bold text-white text-lg">{cliente.nombre}</div>
        <span className="bg-slate-700 text-blue-300 py-1 px-2 rounded text-xs font-medium border border-slate-600">
          {cliente.empresa}
        </span>
      </td>
      
      <td className="p-4 text-slate-300 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-slate-500">📧</span> {cliente.email}
        </div>
        {cliente.telefono && (
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-slate-600">📞</span> {cliente.telefono}
          </div>
        )}
      </td>
      
      <td className="p-4 text-center">
        <div className="flex justify-center gap-2">
          <button 
            onClick={() => onEdit(cliente)}
            className="p-2 bg-blue-900/30 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-all border border-blue-900/50 hover:border-blue-500"
            title="Editar"
          >
            <FaEdit />
          </button>
          
          <button 
            onClick={() => onDelete(cliente)} 
            className="p-2 bg-red-900/30 text-red-400 rounded hover:bg-red-600 hover:text-white transition-all border border-red-900/50 hover:border-red-500"
            title="Eliminar"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}