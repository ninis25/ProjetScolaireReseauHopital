const express = require('express');
const { login, register, logout, getUser, checkRole } = require('../controllers/authController');
const router = express.Router();

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

// Route pour la déconnexion
router.get('/logout', logout);

// Nouvelle route pour vérifier le rôle de l'utilisateur
router.get('/checkRole', checkRole);  // Ajout de la route checkRole

// Route pour récupérer les informations de l'utilisateur connecté
router.get('/getUser', getUser);

module.exports = router;