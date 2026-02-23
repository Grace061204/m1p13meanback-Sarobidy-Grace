const categorieBoutiqueService = require('../../services/categorieBoutique/CategorieBoutiqueService');

exports.create = async (req, res) => {
  try {
    const categorie = await categorieBoutiqueService.createCategorieBoutique(req.body);
    res.status(201).json({ message: 'OK', data: categorie });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await categorieBoutiqueService.getAllCategorieBoutiques();
    res.status(200).json({ message: 'OK', data: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const categorie = await categorieBoutiqueService.getCategorieBoutiqueById(req.params.id);
    res.status(200).json({ message: 'OK', data: categorie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const categorie = await categorieBoutiqueService.updateCategorieBoutique(req.params.id, req.body);
    res.status(200).json({ message: 'OK', data: categorie });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.desactiver = async (req, res) => {
  try {
    const categorie = await categorieBoutiqueService.desactiverCategorieBoutique(req.params.id);
    res.status(200).json({ message: 'Catégorie désactivée', data: categorie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};