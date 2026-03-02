const mongoose = require('mongoose');

const boutiqueSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  idCategorie: { type: mongoose.Schema.Types.ObjectId, ref: 'CategorieBoutique', required: true },
  box: { type: String },
  etage: { type: String },
  logo: { type: String },
  status: { type: Boolean, default: true },
  dateFinLocation: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Boutique', boutiqueSchema);