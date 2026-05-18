import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfile, updateUsernameSuccess } from '../redux/authSlice';

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
          method: 'POST',
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

  if (!isAuthenticated || !token) {
    return null;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {/* CONDITION VISUELLE : Si isEditing est faux, on affiche la vue normale (Photo 1) */}
        {!isEditing ? (
          <>
            <h1>Welcome back<br />{userProfile.firstName || 'Tony'} {userProfile.lastName || 'Stark'}!</h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
          </>
        ) : (
          /* Si isEditing est vrai, on affiche le formulaire d'édition (Photo 2) */
          <div className="edit-form-container">
            <h1>Edit user info</h1>
            <form onSubmit={handleSave}>
              <div className="edit-input-wrapper">
                <label htmlFor="username">User name: </label>
                <input 
                  type="text" 
                  id="username" 
                  value={newUsername} 
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
              </div>
              <div className="edit-input-wrapper">
                <label htmlFor="firstname">First name: </label>
                <input type="text" id="firstname" value={userProfile.firstName} disabled className="disabled-input" />
              </div>
              <div className="edit-input-wrapper">
                <label htmlFor="lastname">Last name: </label>
                <input type="text" id="lastname" value={userProfile.lastName} disabled className="disabled-input" />
              </div>
              
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              
              <div className="edit-buttons">
                <button type="submit" className="form-button">Save</button>
                <button type="button" className="form-button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x5730)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
