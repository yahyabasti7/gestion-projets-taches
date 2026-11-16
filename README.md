# API de Gestion de Projets et de Tâches

## 1. Présentation du projet

Ce projet consiste à développer une API REST permettant la gestion des projets et des tâches à l'aide de Node.js, Express.js et MongoDB.

L'application permet aux utilisateurs de créer des projets, de gérer leurs tâches et de suivre leur avancement. Elle intègre également un système d'authentification et de gestion des rôles.

## 2. Technologies utilisées

- **Node.js** : environnement d'exécution JavaScript.
- **Express.js** : framework pour créer l'API REST.
- **MongoDB** : base de données NoSQL.
- **Mongoose** : gestion des modèles et des données MongoDB.
- **JWT (JSON Web Token)** : authentification et sécurisation des routes.
- **Bcrypt.js** : hachage des mots de passe.
- **Dotenv** : gestion des variables d'environnement.
- **Postman** : test des endpoints de l'API.

## 3. Installation du projet

### Prérequis

- Node.js installé.
- MongoDB Atlas ou une instance MongoDB.
- Git.

### Cloner le projet

```bash
git clone https://github.com/yahyabasti7/gestion-projets-taches.git
```

### Accéder au dossier

```bash
cd gestion-projets-taches
```

### Installer les dépendances

```bash
npm install
```

## 4. Configuration

Créer un fichier `.env` à la racine du projet :

```env
PORT=3000
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
```

Remplacer les valeurs par vos propres informations de configuration.

**Important :** Le fichier `.env` ne doit jamais être partagé ou envoyé sur GitHub.

## 5. Lancement du serveur

Pour lancer le serveur en mode développement :

```bash
npm run dev
```

Pour lancer le serveur normalement :

```bash
npm start
```

L'API sera accessible à l'adresse :

```text
http://localhost:3000
```

## 6. Structure du projet

```text
gestion-projets-taches/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── managerMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│
├── scripts/
│   └── createManager.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## 7. Fonctionnalités principales

### Authentification
- Inscription des utilisateurs.
- Connexion avec vérification du mot de passe.
- Génération d'un token JWT.
- Protection des routes privées.

### Gestion des utilisateurs
- Gestion de deux rôles : `user` et `manager`.
- Mots de passe protégés par hachage.

### Gestion des projets
- Création d'un projet.
- Consultation des projets.
- Modification et suppression des projets.
- Recherche et tri des projets.
- Un utilisateur consulte uniquement ses propres projets.
- Un manager peut consulter tous les projets.

### Gestion des tâches
- Création d'une tâche.
- Consultation des tâches d'un projet.
- Modification du statut d'une tâche.
- Recherche et tri des tâches.
- Attribution des tâches par le manager.
- Vérification des permissions et de la propriété des projets.

## 8. Sécurité et permissions

L'API utilise plusieurs mécanismes de sécurité :

- Authentification par JWT.
- Vérification des rôles.
- Protection des routes avec des middlewares.
- Vérification de la propriété des projets et des tâches.
- Validation des identifiants MongoDB.
- Hachage des mots de passe avec Bcrypt.js.

## 9. Tests avec Postman

Les endpoints peuvent être testés avec Postman.

Pour accéder aux routes protégées, il faut ajouter le token JWT dans l'en-tête :

```text
Authorization: Bearer VOTRE_TOKEN
```

## 10. Auteur

Nom et prénom : Yahya Basti

Projet réalisé individuellement dans le cadre du mini-projet DS1 
