# 🌿 Guide Complet de Mise en Production & Déploiement — Sufi Garden (V2.0)

Ce document fournit la procédure complète pour le déploiement et l'exploitation de l'écosystème Sufi Garden en production (Next.js 15, NestJS 11, Prisma ORM, PostgreSQL 15).

---

## 🏗️ 1. Architecture du Projet

* **Frontend :** Next.js 15.5 (App Router, React 19, Tailwind CSS, SG Studio CMS).
* **Backend :** NestJS 11 (REST API, Prisma ORM, JWT, Bcrypt, Throttling, RBAC).
* **Base de Données :** PostgreSQL 15 (Schéma Prisma avec User, Program, Article, Category, Event, Gallery, Donation, Newsletter, ContactMessage, Setting).

---

## 🚀 2. Déploiement Conteneurisé avec Docker Compose (Recommandé)

### A. Cloner et configurer les variables d'environnement
Créez un fichier `.env` à la racine à partir du modèle :
```bash
cp .env.example .env
```

Assurez-vous de renseigner un mot de passe sécurisé pour PostgreSQL et un secret JWT aléatoire fort :
```env
POSTGRES_USER=sufi_admin
POSTGRES_PASSWORD=votre_mot_de_passe_robuste_2026
POSTGRES_DB=sufigarden_db
DATABASE_URL=postgresql://sufi_admin:votre_mot_de_passe_robuste_2026@postgres:5432/sufigarden_db?schema=public
JWT_SECRET=chaine_aleatoire_de_64_caracteres_securisee
PORT=3001
NEXT_PUBLIC_API_URL=https://api.votredomaine.org
ALLOWED_ORIGINS=https://votredomaine.org,https://www.votredomaine.org
```

### B. Démarrer les services
```bash
docker-compose up -d --build
```

### C. Exécuter la migration & le Seed initial
```bash
# Appliquer les migrations de schéma Prisma
docker-compose exec backend npx prisma db push --schema=./prisma/schema.prisma

# Injecter les données de démarrage (Super Admin, Programmes, Paramètres)
docker-compose exec backend node prisma/seed.js
```

---

## 💻 3. Déploiement Direct sur Serveur Dédié / VPS (Node.js & PM2)

### A. Prérequis
* Node.js >= 22.0.0
* PostgreSQL 15 ou 16
* PM2 (`npm install -g pm2`)

### B. Initialisation & Base de Données
```bash
# 1. Installer les dépendances
npm ci --prefix backend
npm ci --prefix frontend

# 2. Synchroniser le schéma PostgreSQL & Générer le client Prisma
node node_modules/prisma/build/index.js db push
node prisma/seed.js

# 3. Compiler pour la production
npm run build --prefix backend
npm run build --prefix frontend
```

### C. Démarrer les applications avec PM2
```bash
# Démarrer l'API Backend NestJS
pm2 start backend/dist/main.js --name "sufigarden-backend" -i 2

# Démarrer le Frontend Next.js
pm2 start npm --name "sufigarden-frontend" --prefix frontend -- start

# Sauvegarder l'état PM2 pour le redémarrage automatique
pm2 save
pm2 startup
```

---

## 🧪 4. Exécution des Tests de Validation

Pour valider l'intégrité du système avant toute mise en production :
```bash
# Exécuter la suite de tests unitaires et d'intégration backend
cd backend
npm test
```
Tous les tests doivent afficher `ok` (0 échec).

---

## 🛡️ 5. Contrôle de Santé (Health Check)
Le backend expose un endpoint de surveillance pour les load-balancers ou orchestrateurs :
```bash
curl http://localhost:3001/api/health
```
Réponse attendue :
```json
{
  "status": "ok",
  "timestamp": "2026-09-10T22:00:00.000Z",
  "services": {
    "api": "up",
    "database": "up"
  }
}
```

---

## 🔑 6. Accès Administrateur Super Admin
* **URL de connexion :** `https://votredomaine.org/admin`
* **Compte initialisé :** `harounchedli72@gmail.com`
* **Mot de passe initial :** `admin123` *(À modifier obligatoirement dès la première connexion).*
