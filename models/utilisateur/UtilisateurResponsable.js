const mongoose = require('mongoose');

const responsableSchema = new mongoose.Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    role: {type: Number, required: true},
    mdp: {type: String, required: true},
    email: {type: String, required: true},
    tel: {type: Number, required: true},
}, { timestamps: true });
module.exports = mongoose.model('UtilisateurResponsable', responsableSchema);