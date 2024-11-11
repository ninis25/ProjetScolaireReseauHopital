const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Connexion
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(`Tentative de connexion pour l'utilisateur : ${username}`);

    // Rechercher l'utilisateur dans la base de données
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`Utilisateur ${username} non trouvé dans la base de données`);
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }
    console.log(`Utilisateur ${username} trouvé dans la base de données`);

    // Comparer le mot de passe en clair avec le mot de passe haché dans la base de données
    console.log('Mot de passe en clair fourni :', password);
    console.log('Mot de passe haché dans la base de données :', user.password);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log(`Mot de passe incorrect pour l'utilisateur : ${username}`);
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Ajouter l'utilisateur à la session
    req.session.user = user;

    console.log(`Utilisateur ${username} connecté avec succès`);
    console.log('Session utilisateur:', req.session.user);

    // Redirection vers la page d'accueil après connexion réussie
    return res.redirect('/views/index.html');
  } catch (err) {
    console.log('Erreur lors de la connexion:', err);
    return res.status(500).json({ message: 'Erreur lors de la connexion', error: err });
  }
};

// Inscription
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Vérifie si l'utilisateur existe déjà
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris' });
    }

    // Hash du mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const newUser = new User({ username, password: hashedPassword, role: role || 'user' });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    console.log('Erreur lors de l\'inscription:', err);
    return res.status(500).json({ message: 'Erreur lors de l\'inscription', error: err });
  }
};

// Déconnexion
exports.logout = (req, res) => {
  // Détruire la session lors de la déconnexion
  req.session.destroy(err => {
    if (err) {
      console.log('Erreur lors de la déconnexion:', err);
      return res.status(500).json({ message: 'Erreur lors de la déconnexion', error: err });
    }
    // Redirection vers la page de connexion après déconnexion
    res.redirect('/views/login.html');
  });
};

// Vérification du rôle de l'utilisateur
exports.checkRole = (req, res) => {
  if (!req.session.user) {
    console.log('Aucun utilisateur en session');
    return res.status(403).json({ message: 'Non autorisé' });
  }
  console.log('Rôle de l\'utilisateur:', req.session.user.role);
  res.json({ role: req.session.user.role });
};

// Récupérer les informations de l'utilisateur connecté
exports.getUser = (req, res) => {
  if (!req.session.user) {
    console.log('Aucun utilisateur en session');
    return res.status(403).json({ message: 'Non autorisé' });
  }
  console.log('Utilisateur connecté:', req.session.user);
  res.json({ user: req.session.user });
};