# 🏥 Projet "Hôpital Connecté" 🚀

**Équipe :** Anisse FOUKA, Mourad AMGHAR, Mehdi BERRADA, Altay CEVIK  

## 🔍 Contexte
La digitalisation des hôpitaux impose une infrastructure réseau à la fois sécurisée et performante. Ce projet propose de moderniser l'infrastructure avec des VLANs, un pare-feu Stormshield, et une application de gestion des patients et des imprimantes, intégrant une messagerie pour faciliter les communications.

## 🎯 Objectifs
Les principaux objectifs de ce projet sont :
1. **Sécuriser les données médicales** avec une architecture segmentée.
2. **Intégrer des dispositifs IoT** pour une gestion efficace.
3. **Centraliser la gestion hospitalière** des patients et imprimantes avec une application dédiée.

## 📦 Contenu du Projet
### 1. 🔧 Infrastructure Réseau
- **Segmentation VLAN** : Isolation des services pour sécuriser les flux de données.
- **Pare-feu Stormshield** : Configuration pour filtrer le trafic et prévenir les intrusions.

### 2. 💻 Application de Gestion
L'application permet :
- **Gestion des patients** : ajout et mise à jour des informations par service.
- **Suivi des imprimantes** : suivi des niveaux d'encre pour anticiper les besoins.
- **Messagerie email** : intégration de Nodemailer et Postfix pour des alertes internes.

### 3. 🎥 Vidéo de Présentation
Une **vidéo de démonstration** est incluse, montrant le fonctionnement de l'application et des configurations réseau.

---

## 📖 Guide d'Installation

### Prérequis
- **Node.js** et **npm** pour exécuter l'application.
- **Postfix** pour gérer l'envoi d'emails depuis le serveur.
- **Stormshield** pour sécuriser l'infrastructure.

### Installation des dépendances Node.js
1. **Cloner le dépôt du projet**  
   ```bash
   git clone <URL-du-dépôt>
   cd Hopital
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

### Configuration de Nodemailer et Postfix

#### Configuration de Nodemailer
* Modifiez `config/mailConfig.js` pour configurer Nodemailer.

#### Configuration de Postfix
1. Installez Postfix :
   ```bash
   sudo apt install postfix
   ```

2. Modifiez `/etc/postfix/main.cf` pour définir :
   - Le serveur SMTP
   - Le relais (relayhost)

3. Redémarrez Postfix :
   ```bash
   sudo systemctl restart postfix
   ```

### Démarrage de l'application
```bash
node app.js
```

### Accès à l'application
Rendez-vous sur `http://localhost:3000` ou selon votre configuration réseau.

### Configuration des équipements réseau

#### Stormshield
* Chargez et sauvegardez la configuration de sécurité
* Redémarrez Stormshield pour assurer l'application des règles

#### Switch
* Configurez les VLANs selon les spécifications du projet
* Sauvegardez la configuration
* Redémarrez le switch pour appliquer les changements
