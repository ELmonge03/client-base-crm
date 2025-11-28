// utils/toastAlerts.js
import { toast } from 'react-toastify';

// Esta función recibe 3 cosas: Título, el Texto Principal y el Subtexto
export const showDeleteToast = (titulo, nombrePrincipal, detalleSecundario) => {
  toast.dark(
    <div className="flex flex-col items-center text-center px-6 py-2">
      <span className="text-2xl mb-2">🗑️</span>
      <span className="font-bold text-lg border-b border-gray-600 pb-1 mb-2 w-full">
        {titulo}
      </span>
      <span className="text-yellow-400 font-bold text-xl block mb-1">
        {nombrePrincipal}
      </span>
      <span className="text-sm text-gray-400 italic">
        {detalleSecundario}
      </span>
    </div>,
    {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { 
        background: '#1e293b', // Color Slate-800
        border: '1px solid #475569', // Borde grisáceo
        minWidth: '300px'
      }
    }
  );
};