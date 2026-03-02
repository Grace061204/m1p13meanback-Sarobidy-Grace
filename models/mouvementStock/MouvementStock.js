const mongoose = require('mongoose');
const mouvementStockSchema = new mongoose.Schema({
  idArticle: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  type: { type: String, enum: ['entree', 'sortie'], required: true },
  quantite: { type: Number, required: true },
  motif: { type: String },
  idVente: { type: mongoose.Schema.Types.ObjectId, ref: 'Vente' },
}, { timestamps: true });
module.exports = mongoose.model('MouvementStock', mouvementStockSchema);