const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  prix: { type: Number, required: true },
  image: { type: String },
  quantite: { type: Number, required: true, default: 0 },
  seuilAlerte: { type: Number, required: true, default: 5 },
  idBoutique: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique', required: true },
  status: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model('Article', articleSchema);