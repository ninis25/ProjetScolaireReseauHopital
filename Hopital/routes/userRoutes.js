const express = require('express');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/authMiddleware'); // Correctement importé
const User = require('../models/user'); // Modèle de l'utilisateur
const bcrypt = require('bcryptjs'); // Pour hacher les mots de passe
const router = express.Router();

// Route pour obtenir tous les utilisateurs (nécessite d'être admin ou superadmin)
router.get('/', ensureAuthenticated, ensureAdmin, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
    res.json(users);
  });
});

// Route POST pour créer un nouvel utilisateur
router.post('/create', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const { username, password, role, email } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
    }

    // Hacher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role: role || 'user' // Par défaut, le rôle est "user" si non spécifié
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: err });
  }
});

module.exports = router;