// controllers/mailController.js
const nodemailer = require('nodemailer');
const Mail = require('../models/mail');
const User = require('../models/user');

// Configuration du transporteur Nodemailer (Postfix local)
const transporter = nodemailer.createTransport({
  host: 'localhost',  // Si Postfix est configuré pour fonctionner en local
  port: 25,
  secure: false, // Pas de TLS
  tls: {
    rejectUnauthorized: false
  }
});

// Envoyer un email
exports.sendMail = async (req, res) => {
  const { toEmail, subject, body } = req.body;

  console.log('Requête reçue pour envoyer un email:', req.body);
  console.log('Utilisateur connecté:', req.session.user);

  try {
    // Assurer que le destinataire existe
    const recipient = await User.findOne({ email: toEmail });
    if (!recipient) {
      console.log('Destinataire introuvable');
      return res.status(404).json({ message: 'Destinataire introuvable' });
    }

    console.log('Destinataire trouvé:', recipient.email);

    // Détails de l'email
    const mailOptions = {
      from: req.session.user.email,  // Expéditeur (email de l'utilisateur connecté)
      to: recipient.email,  // Destinataire
      subject,
      text: body
    };

    console.log('Options de l\'email:', mailOptions);

    // Envoi du mail
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');

    // Enregistrement de l'email dans la base de données
    console.log('Tentative d\'enregistrement de l\'email dans la base de données...');
    const newMail = new Mail({
      from: req.session.user._id,
      to: recipient._id,
      subject,
      body
    });

    await newMail.save();
    console.log('Email enregistré dans la base de données');

    res.status(200).json({ message: 'Email envoyé et enregistré avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error });
  }
};

// Récupérer les emails reçus
exports.getReceivedMails = async (req, res) => {
  try {
    const receivedMails = await Mail.find({ to: req.session.user._id }).populate('from', 'username email');
    console.log('Emails reçus récupérés:', receivedMails);
    res.status(200).json(receivedMails);
  } catch (error) {
    console.error('Erreur lors de la récupération des emails:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des emails', error });
  }
};