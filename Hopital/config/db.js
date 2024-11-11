// config/db.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Assurez-vous que le chemin est correct
const connectDB = async () => {
  try {
    // Connexion à la base de données MongoDB
    await mongoose.connect('mongodb://localhost:27017/hopital2db');
    console.log('MongoDB Connected...');

    // Créer un utilisateur admin par défaut s'il n'existe pas
    const userExists = await User.findOne({ username: 'admin' });
    if (!userExists) {
      const hashedPassword = await bcrypt.hash('password123', 10); // Mot de passe par défaut
      const adminUser = new User({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@hopital.fr',  // Ajouter un email par défaut
        role: 'admin'
      });
      await adminUser.save();
      console.log('Utilisateur admin créé avec succès');
    }

  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err.message);
    process.exit(1);  // Arrêter l'application en cas d'échec
  }
};

module.exports = connectDB;
