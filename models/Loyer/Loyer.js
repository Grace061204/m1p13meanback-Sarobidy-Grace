const mongoose = require('mongoose');

const loyerSchema = new mongoose.Schema({
  idContrat: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrat', required: true },
  mois: { type: Number, required: true },
  annee: { type: Number, required: true },
  montant: { type: Number, required: true },
  dateEcheance: { type: Date, required: true },
  datePaiement: { type: Date },
  status: { 
    type: String, 
    enum: ['en_attente', 'paye', 'en_retard'], 
    default: 'en_attente' 
  },
}, { timestamps: true });

module.exports = mongoose.model('Loyer', loyerSchema);