import React from 'react';
/** * Composant pour afficher les informations d'un compte bancaire
 * @param {string} title - Le titre du compte (ex: "Argent Bank Checking")
 * @param {string} amount - Le montant actuel du compte (ex: "$2,082.79")
 * @param {string} description - Une description du compte (ex: "Available Balance")
 */

function AccountCard({ title, amount, description }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

export default AccountCard;