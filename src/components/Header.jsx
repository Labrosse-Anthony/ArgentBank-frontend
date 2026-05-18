import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import logo from '../assets/img/argentBankLogo.webp';

function Header() {
  // On récupère l'état de connexion et le profil depuis Redux
  const { isAuthenticated, userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout()); // Vide le store Redux
    navigate('/'); // Redirige vers la page d'accueil
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      
      <div>
        {/* CONDITION : Si l'utilisateur est connecté */}
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {/* Affiche le userName s'il existe, sinon le firstName */}
              <span style={{ marginRight: '10px', marginLeft: '5px' }}>
                {userProfile.userName || userProfile.firstName}
              </span>
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          /* CONDITION : Si l'utilisateur n'est pas connecté */
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;