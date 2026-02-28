const mongoose = require('mongoose');

const responsableSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  role: { type: Number, required: true }, // 1=admin, 2=gerant, 3=client
  mdp: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: Number, required: true },
  idBoutique: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique' }, // seulement pour gerant
}, { timestamps: true });

module.exports = mongoose.model('UtilisateurResponsable', responsableSchema);
