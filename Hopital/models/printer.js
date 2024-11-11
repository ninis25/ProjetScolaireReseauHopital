const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({
  model: { type: String, required: true },    // Modèle de l'imprimante
  location: { type: String, required: true }, // Emplacement physique de l'imprimante
  status: { type: String, required: true, enum: ['online', 'offline', 'maintenance'], default: 'online' },  // Statut de l'imprimante
  inkLevel: { type: Number, min: 0, max: 100, required: true },  // Niveau d'encre en pourcentage
  paperAvailable: { type: Boolean, required: true, default: true }  // Indique si du papier est disponible
});

module.exports = mongoose.model('Printer', printerSchema);