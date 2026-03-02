
const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  idVente:              { type: mongoose.Schema.Types.ObjectId, ref: 'Vente', required: true },
  idPaiementMode:       { type: mongoose.Schema.Types.ObjectId, ref: 'PaiementMode', required: true },
  montant:              { type: Number, required: true },
  referenceTransaction: { type: String },
  status: { 
    type: String, 
    enum: ['en_attente', 'confirme', 'rejete'], 
    default: 'en_attente' 
  },
  datePaiement:     { type: Date, default: Date.now },
  dateConfirmation: { type: Date },
  note:             { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Paiement', paiementSchema);