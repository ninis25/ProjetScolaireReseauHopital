const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Créer un nouvel utilisateur (admin ou utilisateur standard)
exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris' });

    // Vérifier si l'email existe déjà
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: 'L\'email est déjà utilisé' });

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec les informations fournies
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user' // Le rôle peut être 'admin' ou 'user', par défaut 'user'
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: err });
  }
};