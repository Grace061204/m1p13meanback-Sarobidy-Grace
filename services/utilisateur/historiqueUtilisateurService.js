const HistoriqueUtilisateur = require("../../models/utilisateur/HistoriqueUtilisateur");

const createHistorique = async (data) => {
  const historique = new HistoriqueUtilisateur(data);
  return await historique.save();
};

module.exports = {
    createHistorique
};
