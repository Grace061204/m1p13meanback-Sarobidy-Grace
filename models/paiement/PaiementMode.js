// models/PaiementMode.js
const mongoose = require('mongoose');

const paiementModeSchema = new mongoose.Schema({
  idBoutique: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique', required: true },
  type: { 
    type: String, 
    enum: ['espece', 'mobile_money', 'virement', 'carte'], 
    required: true 
  },
  details: {
    numeroTelephone: { type: String },
    nomReseau:       { type: String }, // MVola, Orange Money...
    nomTitulaire:    { type: String },
    // rib:             { type: String },
  },
  estPrincipal: { type: Boolean, default: false },
  status: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('PaiementMode', paiementModeSchema);