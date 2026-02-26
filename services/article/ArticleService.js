const Article = require('../../models/article/Article');
const MouvementStock = require('../../models/mouvementStock/MouvementStock');
const HistoriquePrix = require('../../models/historiquePrix/HistoriquePrix');

const createArticle = async (data) => new Article(data).save();

const getAllArticles = async (filter = {}) => Article.find(filter).populate('idBoutique');

const getArticleById = async (id) => Article.findById(id).populate('idBoutique');

const updateArticle = async (id, data) => {
  const ancien = await Article.findById(id);
  if (data.prix && Number(data.prix) !== Number(ancien.prix)) {
    await new HistoriquePrix({ idArticle: id, ancienPrix: ancien.prix, nouveauPrix: data.prix }).save();
  }
  return Article.findByIdAndUpdate(id, data, { new: true });
};

const desactiverArticle = async (id) => Article.findByIdAndUpdate(id, { status: false }, { new: true });

const getArticlesEnAlerte = async () =>
  Article.find({ $expr: { $lte: ['$quantite', '$seuilAlerte'] }, status: true }).populate('idBoutique');

const entreeStock = async (idArticle, quantite, motif) => {
  const article = await Article.findByIdAndUpdate(idArticle, { $inc: { quantite } }, { new: true });
  await new MouvementStock({ idArticle, type: 'entree', quantite, motif }).save();
  return article;
};

const getMouvements = async (idArticle) => {
  const filter = idArticle ? { idArticle } : {};
  return MouvementStock.find(filter).populate('idArticle').sort({ createdAt: -1 });
};

const getHistoriquePrix = async (idArticle) =>
  HistoriquePrix.find({ idArticle }).sort({ createdAt: -1 });

module.exports = {
  createArticle, getAllArticles, getArticleById, updateArticle,
  desactiverArticle, getArticlesEnAlerte, entreeStock, getMouvements, getHistoriquePrix,
};