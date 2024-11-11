// controllers/printerController.js
const Printer = require('../models/printer');

// Ajouter une imprimante
exports.addPrinter = async (req, res) => {
  const { printerName, department, inkLevel, status } = req.body;
  try {
    const newPrinter = new Printer({ printerName, department, inkLevel, status });
    await newPrinter.save();
    res.status(201).json({ message: 'Imprimante ajoutée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'imprimante', error: err });
  }
};

// Récupérer toutes les imprimantes
exports.getPrinters = async (req, res) => {
  try {
    const printers = await Printer.find();
    res.status(200).json(printers);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des imprimantes', error: err });
  }
};
