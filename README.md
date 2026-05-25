# Argent Bank - Application bancaire

![Argent Bank Logo](https://raw.githubusercontent.com/OpenClassrooms-Student-Center/Project-10-Bank-API/master/designs/argentBankLogo.png)

* Ce travail a été réalisé dans le cadre du projet n°10 de la formation Intégrateur Web d'OpenClassrooms.
* Ce projet consiste en la création d'une application web dynamique avec React pour une banque nommée Argent Bank.
* L'objectif du site est de permettre aux utilisateurs de se connecter de manière sécurisée et de gérer leur profil utilisateur en interagissant avec une API REST.

## Fonctionnalités

* **Authentification sécurisée :** Mise en place d'un système de connexion via une API REST avec récupération et stockage d'un jeton d'accès (JWT).
* **Gestion d'état globale :** Utilisation de Redux Toolkit pour centraliser les informations de session (token) et les données du profil utilisateur.
* **Routage dynamique :** Navigation fluide sans rechargement de page (Single Page Application) grâce à React Router DOM, avec protection des routes privées.
* **Mise à jour du profil :** Formulaire interactif permettant à l'utilisateur de modifier son pseudonyme (userName) avec sauvegarde persistante sur la base de données (requête PUT).
* **Intégration API avec Swagger :** Utilisation de la documentation Swagger pour structurer les requêtes HTTP (POST, PUT) selon les schémas de données attendus.

## Installation

Le projet nécessite de faire tourner à la fois le serveur Backend (l'API) et le serveur Frontend (l'application React).

### 1. Installation du Backend (API)

```bash
# Clonez le dépôt backend fourni par OpenClassrooms
git clone [https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API.git](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API.git)

# Installez les dépendances
npm install

# Lancez le serveur de développement (sur le port 3001)
npm run dev:server

### 2.Installation du Frontend

```bash
# Installez l'ensemble des dépendances du projet
npm install

# Lancez l'application en mode développement (accessible sur http://localhost:3000)
npm start

## Outils et langages pour la réalisation du projet

* Le projet a été réalisé avec **HTML5**, **CSS3 (Sass)**, **JavaScript** et **React**.
* La gestion d'état globale a été propulsée par **Redux Toolkit** et **React-Redux**.
* Le routage dynamique a été géré via **React Router DOM**.
* La communication avec la base de données a été orchestrée via des appels **API REST** et documentée avec **Swagger**.