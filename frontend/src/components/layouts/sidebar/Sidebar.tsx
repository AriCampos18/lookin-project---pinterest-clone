import './sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleAddPin = () => {
    navigate('/criarPin');
    location.pathname = "/criarPin";
  };
  const handleHome = () => {
    navigate('/home');
    location.pathname = "/home";
  };

  const handleUserPage = () => {
    navigate('/userPage');
    location.pathname = "/userPage";
  };

  return (
    <aside className="app-sidebar">
      {/* Brand Logo */}
      <div className="sidebar-logo-container">
        <svg className="sidebar-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>

      {/* Navigation Buttons */}
      <div className="sidebar-top">
        {/* Home Button */}
        <button
          type="button"
          className={`sidebar-btn ${location.pathname == '/home' ? 'active' : ''}`}
          onClick={() => handleHome()}
          data-tooltip="Início"
          aria-label="Ir para a Página Inicial"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>

        {/* Add Button */}
        <button
          type="button"
          className={`sidebar-btn ${location.pathname == '/criarPin' ? 'active' : ''}`}
          onClick={() => handleAddPin()}
          data-tooltip="Criar Pin"
          aria-label="Criar novo Pin"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      <div className="sidebar-bottom">
        <button
          type="button"
          className={`sidebar-btn ${location.pathname == '/userPage' ? 'active' : ''}`}
          onClick={() => handleUserPage()}
          data-tooltip="Perfil"
          aria-label="Ir para o perfil"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>

        {/* Logout Button */}
        <button
          type="button"
          className="sidebar-btn"
          onClick={() => navigate('/')}
          data-tooltip="Sair"
          aria-label="Sair da Conta"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}