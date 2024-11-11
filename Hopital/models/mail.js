const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    dateSent: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mail', mailSchema);

