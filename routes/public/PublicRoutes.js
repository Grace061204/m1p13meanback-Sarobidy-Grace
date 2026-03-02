const express = require('express');
const router = express.Router();
const Article = require('../../models/article/Article');
const Boutique = require('../../models/boutique/Boutique');

// Liste boutiques actives
router.get('/boutiques', async (req, res) => {
  try {
    const boutiques = await Boutique.find({ status: true }).populate('idCategorie');
    res.status(200).json({ message: 'OK', data: boutiques });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Articles d'une boutique avec recherche et filtre catégorie
router.get('/articles', async (req, res) => {
  try {
    const { idBoutique, search, idCategorie } = req.query;
    const filter = { status: true };
    if (idBoutique) filter.idBoutique = idBoutique;
    if (search) filter.nom = { $regex: search, $options: 'i' };
    const articles = await Article.find(filter).populate('idBoutique');
    res.status(200).json({ message: 'OK', data: articles });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;