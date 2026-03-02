const PaiementMode = require('../../models/paiement/PaiementMode');

const addPaiementMode = async (data) => {
  if (data.estPrincipal) {
    await PaiementMode.updateMany({ idBoutique: data.idBoutique }, { estPrincipal: false });
  }
  return await PaiementMode.create(data);
};

const getByBoutique = async (idBoutique) => {
  return await PaiementMode.find({ idBoutique, status: true });
};

const updatePaiementMode = async (id, data) => {
  if (data.estPrincipal) {
    const mode = await PaiementMode.findById(id);
    await PaiementMode.updateMany({ idBoutique: mode.idBoutique }, { estPrincipal: false });
  }
  return await PaiementMode.findByIdAndUpdate(id, data, { new: true });
};

const deletePaiementMode = async (id) => {
  return await PaiementMode.findByIdAndUpdate(id, { status: false }, { new: true });
};

module.exports = { addPaiementMode, getByBoutique, updatePaiementMode, deletePaiementMode}