const express = require('express');
const path = require('path');
const session = require('express-session');
const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const printerRoutes = require('./routes/printerRoutes');
const mailRoutes = require('./routes/mailRoutes'); // Importation des routes pour la messagerie
const { ensureAuthenticated, ensureAdmin, ensureSuperAdmin } = require('./middlewares/authMiddleware'); // Import des middlewares

const app = express();

// Connexion à la base de données
connectDB();

// Middleware pour gérer les sessions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  }
}));

// Logs pour les fichiers statiques
console.log('Mise en place des fichiers statiques...');

// Middleware pour servir les fichiers statiques (CSS, JS, images, HTML)
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views'))); // Servir les fichiers HTML

// Routes pour l'authentification
console.log('Ajout des routes pour l\'authentification...');
app.use('/api/auth', authRoutes);

// Routes pour les utilisateurs, patients, imprimantes, et mails
console.log('Ajout des routes pour les utilisateurs, patients, imprimantes et mails...');
app.use('/api/users', ensureAuthenticated, ensureAdmin, userRoutes);  // Accessible pour admin et superadmin
app.use('/api/patients', ensureAuthenticated, patientRoutes);
app.use('/api/printers', ensureAuthenticated, printerRoutes);
app.use('/api/mail', ensureAuthenticated, mailRoutes); // Ajout des routes pour la gestion des emails

// Redirection automatique vers la page de connexion au lancement
app.get('/', ensureAuthenticated, (req, res) => {
  console.log('Redirection vers la page d\'accueil après authentification.');
  res.redirect('/views/index.html');  // Rediriger vers la page d'accueil après connexion
});

// Route pour la page admin (accessible par admin et superadmin)
app.get('/admin', ensureAuthenticated, ensureAdmin, (req, res) => {
  console.log('Chargement de la page admin pour:', req.session.user.username);
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// Route pour la page de consultation des patients
app.get('/consultPatients.html', ensureAuthenticated, (req, res) => {
  console.log('Chargement de la page de consultation des patients pour:', req.session.user.username);
  res.sendFile(path.join(__dirname, 'views/consultPatients.html'));
});

// Route pour ajouter un patient
app.get('/addPatient.html', ensureAuthenticated, (req, res) => {
  console.log('Chargement de la page d\'ajout de patient pour:', req.session.user.username);
  res.sendFile(path.join(__dirname, 'views/addPatient.html'));
});

// Route pour gérer les imprimantes
app.get('/managePrinters.html', ensureAuthenticated, (req, res) => {
  console.log('Chargement de la page de gestion des imprimantes pour:', req.session.user.username);
  res.sendFile(path.join(__dirname, 'views/managePrinters.html'));
});

// Route pour ajouter un utilisateur (accessible uniquement par superadmin)
app.get('/addUser.html', ensureAuthenticated, ensureSuperAdmin, (req, res) => {
  console.log('Chargement de la page d\'ajout d\'utilisateur pour:', req.session.user.username);
  res.sendFile(path.join(__dirname, 'views/addUser.html'));
});

// Route pour afficher la page des mails reçus
app.get('/receivedMails.html', ensureAuthenticated, (req, res) => {
  console.log('Chargement de la page des mails reçus pour:', req.session.user.username);
  res.sendFile(path.join(__dirname, 'views', 'receivedMails.html'));
});

// Logs pour le démarrage du serveur
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';  // Permet d'écouter sur toutes les interfaces réseau

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log('Serveur démarré avec succès et en attente de connexions...');
});