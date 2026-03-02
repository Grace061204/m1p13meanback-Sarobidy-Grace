const Paiement = require('../../models/paiement/PaiementPaiement');
const Vente    = require('../../models/Vente/Vente');

const initierPaiement = async ({ idVente, idPaiementMode, montant, referenceTransaction }) => {
  const vente = await Vente.findById(idVente);
  if (!vente) throw new Error('Vente introuvable');
  if (vente.status === 'annule') throw new Error('Cette vente est annulée');

  const dejaPaye = await Paiement.findOne({ idVente, status: { $in: ['en_attente', 'confirme'] } });
  if (dejaPaye) throw new Error('Un paiement existe déjà pour cette vente');

  return await Paiement.create({
    idVente,
    idPaiementMode,
    montant,
    referenceTransaction,
    status: 'en_attente',
  });
};

const confirmerPaiement = async (id) => {
  const paiement = await Paiement.findById(id);
  if (!paiement) throw new Error('Paiement introuvable');
  if (paiement.status === 'confirme') throw new Error('Paiement déjà confirmé');

  paiement.status = 'confirme';
  paiement.dateConfirmation = new Date();
  await paiement.save();

  return paiement;
};

const rejeterPaiement = async (id, note) => {
  const paiement = await Paiement.findById(id);
  if (!paiement) throw new Error('Paiement introuvable');

  paiement.status = 'rejete';
  paiement.note = note;
  await paiement.save();

  return paiement;
};

const getAllPaiements = async (filter = {}) => {
  return await Paiement.find(filter)
    .populate({ path: 'idVente', populate: { path: 'idBoutique', select: 'nom' } })
    .populate('idPaiementMode', 'type details')
    .sort({ createdAt: -1 });
};

const getPaiementByVente = async (idVente) => {
  return await Paiement.findOne({ idVente }).populate('idPaiementMode');
};

module.exports = { initierPaiement, confirmerPaiement, rejeterPaiement, getAllPaiements}