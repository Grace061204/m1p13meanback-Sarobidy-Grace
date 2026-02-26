const Vente = require('../../models/vente/Vente');
const DetailVente = require('../../models/detailVente/DetailVente');
const Article = require('../../models/article/Article');
const MouvementStock = require('../../models/mouvementStock/MouvementStock');

const createVente = async (data) => {
  const { idBoutique, articles } = data;
  const montantTotal = articles.reduce((sum, a) => sum + (a.quantite * a.prixUnitaire), 0);
  const vente = await new Vente({ idBoutique, montantTotal }).save();
  for (const item of articles) {
    await new DetailVente({ idVente: vente._id, idArticle: item.idArticle, quantite: item.quantite, prixUnitaire: item.prixUnitaire }).save();
    await Article.findByIdAndUpdate(item.idArticle, { $inc: { quantite: -item.quantite } });
    await new MouvementStock({ idArticle: item.idArticle, type: 'sortie', quantite: item.quantite, motif: 'Vente', idVente: vente._id }).save();
  }
  return vente;
};

const getAllVentes = async (filter = {}) =>
  Vente.find(filter).populate('idBoutique').sort({ createdAt: -1 });

const getVenteById = async (id) => {
  const vente = await Vente.findById(id).populate('idBoutique');
  const details = await DetailVente.find({ idVente: id }).populate('idArticle');
  return { vente, details };
};

const annulerVente = async (id) => {
  const vente = await Vente.findByIdAndUpdate(id, { status: 'annule' }, { new: true });
  const details = await DetailVente.find({ idVente: id });
  for (const detail of details) {
    await Article.findByIdAndUpdate(detail.idArticle, { $inc: { quantite: detail.quantite } });
    await new MouvementStock({ idArticle: detail.idArticle, type: 'entree', quantite: detail.quantite, motif: 'Annulation vente' }).save();
  }
  return vente;
};

const getStatsVentes = async () => {
  const totalCA = await Vente.aggregate([
    { $match: { status: 'valide' } },
    { $group: { _id: null, total: { $sum: '$montantTotal' } } }
  ]);
  const now = new Date();
  const CAMensuel = await Vente.aggregate([
    { $match: { status: 'valide' } },
    { $addFields: { mois: { $month: '$dateVente' }, annee: { $year: '$dateVente' } } },
    { $match: { mois: now.getMonth() + 1, annee: now.getFullYear() } },
    { $group: { _id: null, total: { $sum: '$montantTotal' } } }
  ]);
  const articlesTop = await DetailVente.aggregate([
    { $group: { _id: '$idArticle', totalVendu: { $sum: '$quantite' }, totalCA: { $sum: { $multiply: ['$quantite', '$prixUnitaire'] } } } },
    { $sort: { totalVendu: -1 } },
    { $limit: 5 },
    { $lookup: { from: 'articles', localField: '_id', foreignField: '_id', as: 'article' } },
    { $unwind: '$article' }
  ]);
  const caMois = await Vente.aggregate([
    { $match: { status: 'valide' } },
    { $group: { _id: { mois: { $month: '$dateVente' }, annee: { $year: '$dateVente' } }, total: { $sum: '$montantTotal' } } },
    { $sort: { '_id.annee': 1, '_id.mois': 1 } }
  ]);
  return { totalCA: totalCA[0]?.total || 0, CAMensuel: CAMensuel[0]?.total || 0, articlesTop, caMois };
};

module.exports = { createVente, getAllVentes, getVenteById, annulerVente, getStatsVentes };