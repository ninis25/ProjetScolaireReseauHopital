// routes/printerRoutes.js
const express = require('express');
const { addPrinter, getPrinters } = require('../controllers/printerController');

const router = express.Router();

// Ajouter une imprimante
router.post('/add', addPrinter);

// Récupérer la liste des imprimantes
router.get('/', getPrinters);

module.exports = router;
