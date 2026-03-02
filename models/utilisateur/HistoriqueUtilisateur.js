const mongoose = require('mongoose');

const historiqueUtiisiateurSchema = new mongoose.Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    role: {type: Number, required: true},
    mdp: {type: String, required: true},
    email: {type: String, required: true},
    tel: {type: String, required: true},
    idboutique: {type:Number, required: false},
    action: {type:Number, required: true},
    idutilisateur: {type: String, required: true},
}, { timestamps: true });
module.exports = mongoose.model('historiqueUtilisateur', historiqueUtiisiateurSchema);