const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  service: { type: String, required: true },     // Service hospitalier auquel appartient le patient
  dateOfBirth: { type: Date, required: true },   // Date de naissance
  address: { type: String, required: false },    // Adresse du patient (facultatif)
  phone: { type: String, required: false },      // Numéro de téléphone du patient (facultatif)
  dateAdmitted: { type: Date, default: Date.now }  // Date d'admission (facultatif)
});

module.exports = mongoose.model('Patient', patientSchema);