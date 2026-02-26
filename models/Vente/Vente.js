const mongoose = require('mongoose');
const venteSchema = new mongoose.Schema({
  idBoutique: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique', required: true },
  dateVente: { type: Date, default: Date.now },
  montantTotal: { type: Number, required: true },
  status: { type: String, enum: ['valide', 'annule'], default: 'valide' },
}, { timestamps: true });
module.exports = mongoose.model('Vente', venteSchema);