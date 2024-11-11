// Middleware pour vérifier si l'utilisateur est authentifié
exports.ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.redirect('/views/login.html');
};

// Middleware pour vérifier si l'utilisateur est admin ou superadmin
exports.ensureAdmin = (req, res, next) => {
  if (req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'superadmin')) {
    return next();
  }
  return res.status(403).json({ message: 'Accès refusé. Vous devez être administrateur ou superadmin.' });
};

// Middleware pour vérifier si l'utilisateur est un superadmin
exports.ensureSuperAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'superadmin') {
    return next();
  }
  return res.status(403).send('Accès refusé. Vous devez être un superadmin pour accéder à cette page.');
};