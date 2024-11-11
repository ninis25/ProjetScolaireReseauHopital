const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Mot de passe haché:', hashedPassword);
}

hashPassword('Champs58h8');  // Remplace par le mot de passe à hacher