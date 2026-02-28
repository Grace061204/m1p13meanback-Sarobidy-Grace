const UtilisateurResponsable = require("../../models/utilisateur/Utilisateur");
const utilisateurService =  require("../../services/utilisateur/utilisateurService");
const Utilisateur = require('../../models/utilisateur/Utilisateur');


exports.createResponsable = async (req, res) => {
  try {
    await utilisateurService.createUser(req.body);
    res.status(200).json({ message: 'OK', data: req.body });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await utilisateurService.findAllUser();
    res.status(200).json({ message: 'OK', data: utilisateurs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUtilisateur = async (req, res) => {
  try {
    const userId = req.params.id;           
    const actionUserId = 1; 
    const updateData = req.body;            

    const updatedUser = await utilisateurService.updateUser(userId, updateData, actionUserId);

    res.status(200).json({
      message: 'Utilisateur modifié avec succès',
      data: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUtilisateur = async (req, res) => {
  try {
    const userId = req.params.id;
    const actionUserId = 1; 
    await utilisateurService.deleteUserWithHistory(userId, actionUserId);
    res.status(200).json({ message: "Utilisateur supprimé et historisé !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginResponsable = async (req, res) => {
  try {
    const { email, mdp } = req.body;
    const { user, token } = await utilisateurService.loginUser(email, mdp);
    const { mdp: _, ...userWithoutPwd } = user.toObject();
    res.status(200).json({
      message: 'Connexion réussie',
      user: userWithoutPwd,
      token: token,
      role: user.role,
      idBoutique: user.idBoutique?._id || null,
      nomBoutique: user.idBoutique?.nom || null,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
    try {
      const data = { ...req.body };
      if (data.mdp) {
        const bcrypt = require('bcrypt');
        data.mdp = await bcrypt.hash(data.mdp, 10);
      } else { delete data.mdp; }
      const user = await UtilisateurResponsable.findByIdAndUpdate(req.params.id, data, { new: true });
      res.status(200).json({ message: 'OK', data: user });
    } catch (e) { res.status(400).json({ error: e.message }); }
  };
  
  exports.desactiver = async (req, res) => {
    try {
      const user = await UtilisateurResponsable.findByIdAndUpdate(req.params.id, { status: false }, { new: true });
      res.status(200).json({ message: 'Désactivé', data: user });
    } catch (e) { res.status(500).json({ error: e.message }); }
  };