// controllers/patientController.js
const Patient = require('../models/patient');

// Ajouter un patient
exports.addPatient = async (req, res) => {
  const { firstName, lastName, service, dateOfBirth, address, phone } = req.body;
  console.log('Données reçues pour ajout de patient:', req.body);
  try {
    const newPatient = new Patient({ firstName, lastName, service, dateOfBirth, address, phone });
    await newPatient.save();
    console.log('Patient ajouté avec succès:', newPatient);
    res.status(201).json({ message: 'Patient ajouté avec succès' });
  } catch (err) {
    console.error('Erreur lors de l\'ajout du patient:', err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du patient', error: err });
  }
};

// Récupérer tous les patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des patients', error: err });
  }
};
