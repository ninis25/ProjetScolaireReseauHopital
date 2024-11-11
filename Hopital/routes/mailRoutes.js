// routes/mailRoutes.js
const express = require('express');
const router = express.Router();
const { sendMail, getReceivedMails } = require('../controllers/mailController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware'); // Assure-toi que cette ligne est correcte

// Route pour envoyer un mail
router.post('/send', ensureAuthenticated, sendMail);

// Route pour afficher les mails reçus
router.get('/received', ensureAuthenticated, getReceivedMails);

module.exports = router;