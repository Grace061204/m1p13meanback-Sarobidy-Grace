const Boutique = require('../../models/boutique/Boutique');

const createBoutique = async (data) => new Boutique(data).save();
const getAllBoutiques = async (filter = {}) => Boutique.find(filter).populate('idCategorie');
const getBoutiqueById = async (id) => Boutique.findById(id).populate('idCategorie');
const updateBoutique = async (id, data) => Boutique.findByIdAndUpdate(id, data, { new: true });
const deleteBoutique = async (id) => Boutique.findByIdAndDelete(id);

module.exports = { createBoutique, getAllBoutiques, getBoutiqueById, updateBoutique, deleteBoutique };