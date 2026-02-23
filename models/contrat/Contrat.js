const mongoose = require('mongoose');

const contratSchema = new mongoose.Schema({
  idBoutique: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique', required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  montantMensuel: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['actif', 'termine', 'resilie'], 
    default: 'actif' 
  },
}, { timestamps: true });

module.exports = mongoose.model('Contrat', contratSchema);