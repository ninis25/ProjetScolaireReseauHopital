// routes/patientRoutes.js
const express = require('express');
const { addPatient, getPatients } = require('../controllers/patientController');

const router = express.Router();

// Ajouter un patient
router.post('/add', addPatient);

// Récupérer la liste des patients
router.get('/', getPatients);

module.exports = router;
