const s = require('../../services/vente/venteService');

exports.create = async (req, res) => {
  try {
    // Gérant : forcer sa boutique
    if (req.user.role === 2) req.body.idBoutique = req.user.idBoutique;
    res.status(201).json({ message: 'Vente enregistrée', data: await s.createVente(req.body) });
  } catch (e) { res.status(400).json({ error: e.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === 2) {
      filter.idBoutique = req.user.idBoutique;
    } else if (req.query.idBoutique) {
      filter.idBoutique = req.query.idBoutique;
    }
    res.status(200).json({ message: 'OK', data: await s.getAllVentes(filter) });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getById = async (req, res) => {
  try { res.status(200).json({ message: 'OK', data: await s.getVenteById(req.params.id) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.annuler = async (req, res) => {
  try { res.status(200).json({ message: 'Annulée', data: await s.annulerVente(req.params.id) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.stats = async (req, res) => {
  try {
    const idBoutique = req.user.role === 2 ? req.user.idBoutique : req.query.idBoutique;
    res.status(200).json({ message: 'OK', data: await s.getStatsVentes(idBoutique) });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.commande = async (req, res) => {
    try {
      const { commandes } = req.body;
      const resultats = [];
      for (const cmd of commandes) {
        const vente = await s.createVente({ ...cmd, idClient: req.user.id });
        resultats.push(vente);
      }
      res.status(201).json({ message: 'Commandes enregistrées', data: resultats });
    } catch (e) { res.status(400).json({ error: e.message }); }
  };