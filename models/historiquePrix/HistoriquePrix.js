const mongoose = require('mongoose');
const historiquePrixSchema = new mongoose.Schema({
  idArticle: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  ancienPrix: { type: Number, required: true },
  nouveauPrix: { type: Number, required: true },
}, { timestamps: true });
module.exports = mongoose.model('HistoriquePrix', historiquePrixSchema);
module.exports = mongoose.model('HistoriquePrix', historiquePrixSchema, 'historiqueprix');