const mongoose = require('mongoose');
const detailVenteSchema = new mongoose.Schema({
  idVente: { type: mongoose.Schema.Types.ObjectId, ref: 'Vente', required: true },
  idArticle: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  quantite: { type: Number, required: true },
  prixUnitaire: { type: Number, required: true },
}, { timestamps: true });
module.exports = mongoose.model('DetailVente', detailVenteSchema);