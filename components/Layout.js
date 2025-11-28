// components/Layout.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUsers, FaProjectDiagram, FaRocket } from 'react-icons/fa'; // Iconos

export default function Layout({ children, titulo }) {
  const router = useRouter();

  const menuItems = [
    { name: 'Clientes', path: '/', icon: <FaUsers /> },
    { name: 'Proyectos', path: '/proyectos', icon: <FaProjectDiagram /> },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* --- SIDEBAR (Barra Lateral) --- */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <FaRocket className="text-blue-500 text-2xl" />
          <h1 className="text-xl font-bold tracking-wide">ClientBase</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">Proyecto AppWeb v1.0.0 </p>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 p-8 pb-4">
          <h2 className="text-3xl font-bold text-white">{titulo}</h2>
        </header>
        <div className="p-8 pt-0">
          {children}
        </div>
      </main>

    </div>
  );
}