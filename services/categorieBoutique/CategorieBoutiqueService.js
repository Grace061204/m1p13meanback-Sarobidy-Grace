const CategorieBoutique = require('../../models/categorieBoutique/CategorieBoutique');

const createCategorieBoutique = async (data) => new CategorieBoutique(data).save();
const getAllCategorieBoutiques = async () => CategorieBoutique.find();
const getCategorieBoutiqueById = async (id) => CategorieBoutique.findById(id);
const updateCategorieBoutique = async (id, data) => CategorieBoutique.findByIdAndUpdate(id, data, { new: true });
const desactiverCategorieBoutique = async (id) => CategorieBoutique.findByIdAndUpdate(id, { status: false }, { new: true });

module.exports = { 
  createCategorieBoutique, 
  getAllCategorieBoutiques, 
  getCategorieBoutiqueById, 
  updateCategorieBoutique, 
  desactiverCategorieBoutique 
};