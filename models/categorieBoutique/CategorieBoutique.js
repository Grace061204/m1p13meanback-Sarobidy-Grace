const mongoose = require('mongoose');

const categorieBoutiqueSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  status: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('CategorieBoutique', categorieBoutiqueSchema);