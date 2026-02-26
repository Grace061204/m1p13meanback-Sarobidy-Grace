const s = require('../../services/article/articleService');

exports.create = async (req, res) => {
  try {
    // Gérant : forcer sa boutique
    if (req.user.role === 2) req.body.idBoutique = req.user.idBoutique;
    res.status(201).json({ message: 'OK', data: await s.createArticle(req.body) });
  } catch (e) { res.status(400).json({ error: e.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    // Gérant voit seulement ses articles
    if (req.user.role === 2) {
      filter.idBoutique = req.user.idBoutique;
    } else if (req.query.idBoutique) {
      filter.idBoutique = req.query.idBoutique;
    }
    if (req.query.status !== undefined) filter.status = req.query.status === 'true';
    res.status(200).json({ message: 'OK', data: await s.getAllArticles(filter) });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getById = async (req, res) => {
  try { res.status(200).json({ message: 'OK', data: await s.getArticleById(req.params.id) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.update = async (req, res) => {
  try { res.status(200).json({ message: 'OK', data: await s.updateArticle(req.params.id, req.body) }); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

exports.desactiver = async (req, res) => {
  try { res.status(200).json({ message: 'Désactivé', data: await s.desactiverArticle(req.params.id) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.enAlerte = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === 2) filter.idBoutique = req.user.idBoutique;
    res.status(200).json({ message: 'OK', data: await s.getArticlesEnAlerte(filter) });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.entreeStock = async (req, res) => {
  try {
    const { quantite, motif } = req.body;
    res.status(200).json({ message: 'Entrée enregistrée', data: await s.entreeStock(req.params.id, quantite, motif) });
  } catch (e) { res.status(400).json({ error: e.message }); }
};

exports.getMouvements = async (req, res) => {
  try { res.status(200).json({ message: 'OK', data: await s.getMouvements(req.params.id) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getAllMouvements = async (req, res) => {
  try { res.status(200).json({ message: 'OK', data: await s.getMouvements(null) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getHistoriquePrix = async (req, res) => {
  try { res.status(200).json({ message: 'OK', data: await s.getHistoriquePrix(req.params.id) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};