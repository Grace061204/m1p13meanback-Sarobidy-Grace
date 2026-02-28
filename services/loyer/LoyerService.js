const Loyer = require('../../models/loyer/Loyer');

const getLoyersByContrat = async (idContrat) => {
  return Loyer.find({ idContrat }).populate({ path: 'idContrat', populate: { path: 'idBoutique' } });
};

const getAllLoyers = async (filter = {}) => {
  return Loyer.find(filter).populate({ path: 'idContrat', populate: { path: 'idBoutique' } });
};

const payerLoyer = async (id) => {
  return Loyer.findByIdAndUpdate(id, { 
    status: 'paye', 
    datePaiement: new Date() 
  }, { new: true });
};

const getLoyersEnRetard = async () => {
  const now = new Date();
  await Loyer.updateMany(
    { status: 'en_attente', dateEcheance: { $lt: now } },
    { status: 'en_retard' }
  );
  return Loyer.find({ status: 'en_retard' }).populate({ path: 'idContrat', populate: { path: 'idBoutique' } });
};

const getDashboardStats = async () => {
  const totalContratsActifs = await require('../../models/contrat/Contrat').countDocuments({ status: 'actif' });
  const totalPaye = await Loyer.aggregate([
    { $match: { status: 'paye' } },
    { $group: { _id: null, total: { $sum: '$montant' } } }
  ]);
  const totalImpaye = await Loyer.aggregate([
    { $match: { status: { $in: ['en_attente', 'en_retard'] } } },
    { $group: { _id: null, total: { $sum: '$montant' } } }
  ]);

  const moisActuel = new Date().getMonth() + 1;
  const anneeActuelle = new Date().getFullYear();
  const revenuMensuel = await Loyer.aggregate([
    { $match: { status: 'paye', mois: moisActuel, annee: anneeActuelle } },
    { $group: { _id: null, total: { $sum: '$montant' } } }
  ]);

  const loyersEnRetard = await Loyer.find({ status: 'en_retard' })
    .populate({ path: 'idContrat', populate: { path: 'idBoutique' } });

  // Stats par mois pour graphe
  const statsMois = await Loyer.aggregate([
    { $match: { status: 'paye', annee: anneeActuelle } },
    { $group: { _id: '$mois', total: { $sum: '$montant' } } },
    { $sort: { _id: 1 } }
  ]);

  return {
    totalContratsActifs,
    totalPaye: totalPaye[0]?.total || 0,
    totalImpaye: totalImpaye[0]?.total || 0,
    revenuMensuel: revenuMensuel[0]?.total || 0,
    loyersEnRetard,
    statsMois,
  };
};

const getDerniersLoyersPaies = async () => {
  return Loyer.find({ status: 'paye' })
    .sort({ datePaiement: -1 })
    .limit(5)
    .populate({ path: 'idContrat', populate: { path: 'idBoutique' } });
};

module.exports = { getDerniersLoyersPaies, getLoyersByContrat, getAllLoyers, payerLoyer, getLoyersEnRetard, getDashboardStats };