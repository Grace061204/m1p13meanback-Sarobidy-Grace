const boutiqueService = require('../../services/boutique/BoutiqueService');

exports.create = async (req, res) => {
  try {
    const boutique = await boutiqueService.createBoutique(req.body);
    res.status(201).json({ message: 'OK', data: boutique });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    // filtres 
    const filter = {};
    if (req.query.idCategorie) filter.idCategorie = req.query.idCategorie;
    if (req.query.etage) filter.etage = req.query.etage;
    if (req.query.status !== undefined) filter.status = req.query.status === 'true';

    const boutiques = await boutiqueService.getAllBoutiques(filter);
    res.status(200).json({ message: 'OK', data: boutiques });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const boutique = await boutiqueService.getBoutiqueById(req.params.id);
    res.status(200).json({ message: 'OK', data: boutique });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const boutique = await boutiqueService.updateBoutique(req.params.id, req.body);
    res.status(200).json({ message: 'OK', data: boutique });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.desactiver = async (req, res) => {
  try {
    const boutique = await boutiqueService.desactiverBoutique(req.params.id);
    res.status(200).json({ message: 'Boutique désactivée', data: boutique });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};