import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfile, updateUsernameSuccess } from '../redux/authSlice';
import AccountCard from '../components/AccountCard'; // <-- Import du nouveau composant

function Profile() {
  const { token, isAuthenticated, userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mode édition : true = formulaire visible, false = texte visible
  const [isEditing, setIsEditing] = useState(false);
  
  // State local pour le champ de modification du username
  const [newUsername, setNewUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Protection de la route et récupération des données du profil
  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Sauvegarde des infos de l'utilisateur dans le store Redux
          dispatch(setProfile(data.body));
          // Pré-remplit le champ d'édition avec le username actuel
          setNewUsername(data.body.userName || '');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };

    fetchUserProfile();
  }, [token, isAuthenticated, navigate, dispatch]);

  // 2. Fonction pour envoyer la modification du username à l'API
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUsername }),
      });

      if (response.ok) {
        // Met à jour Redux avec le nouveau username
        dispatch(updateUsernameSuccess(newUsername));
        // Ferme le formulaire d'édition
        setIsEditing(false);
        setErrorMessage('');
      } else {
        setErrorMessage("Erreur lors de la mise à jour du nom d'utilisateur");
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion au serveur");
    }
  };

  // Sécurité d'affichage si l'utilisateur n'est pas encore chargé
  if (!isAuthenticated || !token || !userProfile) {
    return null;
  }

  // 3. Données des comptes (idéalement, cela viendrait aussi de l'API plus tard)
  const accountsData = [
    {
      id: "1",
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance"
    },
    {
      id: "2",
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance"
    },
    {
      id: "3",
      title: "Argent Bank Credit Card (x5730)",
      amount: "$184.30",
      description: "Current Balance"
    }
  ];

  return (
    <main className="main bg-dark">
      <div className="header">
        {!isEditing ? (
          <>
            <h1>Welcome back<br />{userProfile.firstName} {userProfile.lastName}!</h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
          </>
        ) : (
          <div className="edit-form">
            <h1>Edit user info</h1>
            <form onSubmit={handleSave} className="edit-form-inputs">
              <div className="input-wrapper">
                <label htmlFor="username">User name:</label>
                <input 
                  type="text" 
                  id="username" 
                  value={newUsername} 
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="firstname">First name:</label>
                <input type="text" id="firstname" value={userProfile.firstName} disabled />
              </div>
              <div className="input-wrapper">
                <label htmlFor="lastname">Last name:</label>
                <input type="text" id="lastname" value={userProfile.lastName} disabled />
              </div>
              
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              
              <div className="edit-form-buttons">
                <button type="submit" className="save-button">Save</button>
                <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      
      {/* 4. Affichage dynamique des comptes grâce au composant AccountCard */}
      {accountsData.map((account) => (
        <AccountCard 
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
      
    </main>
  );
}

export default Profile;
