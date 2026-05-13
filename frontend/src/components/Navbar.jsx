import { useAuth0 } from '@auth0/auth0-react';

const ROLES_CLAIM = 'https://courses-app.com/roles';

export default function Navbar() {
  const { user, logout } = useAuth0();
  const roles = user?.[ROLES_CLAIM] || [];
  const isAdmin = roles.includes('ADMIN');

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow">
      <h1 className="text-xl font-bold tracking-wide">Sistema de Cursos</h1>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{user?.name || user?.email}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isAdmin ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-500 text-white'}`}>
            {isAdmin ? 'ADMIN' : 'USER'}
          </span>
        </div>
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="bg-white text-blue-700 text-sm font-semibold px-3 py-1.5 rounded hover:bg-blue-50 transition"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
