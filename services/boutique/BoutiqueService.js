const Boutique = require('../../models/boutique/Boutique');

const createBoutique = async (data) => new Boutique(data).save();
const getAllBoutiques = async (filter = {}) => Boutique.find(filter).populate('idCategorie');
const getBoutiqueById = async (id) => Boutique.findById(id).populate('idCategorie');
const updateBoutique = async (id, data) => Boutique.findByIdAndUpdate(id, data, { new: true });
const deleteBoutique = async (id) => Boutique.findByIdAndDelete(id);

const getTopBoutiques = async () => {
  const topBoutiques = await Vente.aggregate([
    // 1. Filtrer uniquement les ventes valides
    { $match: { status: 'valide' } },

    // 2. Grouper par boutique et sommer les montants
    {
      $group: {
        _id: '$idBoutique',
        chiffreAffaires: { $sum: '$montantTotal' },
        nombreVentes: { $count: {} },
      },
    },

    // 3. Trier par chiffre d'affaires décroissant
    { $sort: { chiffreAffaires: -1 } },

    // 4. Prendre les 5 premières
    { $limit: 5 },

    // 5. Joindre avec la collection Boutique
    {
      $lookup: {
        from: 'boutiques',
        localField: '_id',
        foreignField: '_id',
        as: 'boutique',
      },
    },

    // 6. Déstructurer le tableau boutique
    { $unwind: '$boutique' },

    // 7. Projeter les champs utiles
    {
      $project: {
        _id: 0,
        idBoutique: '$_id',
        nom: '$boutique.nom',
        etage: '$boutique.etage',
        box: '$boutique.box',
        chiffreAffaires: 1,
        nombreVentes: 1,
      },
    },
  ]);

  return topBoutiques;
};

const getTotalBoutiques = async () => {
  return await Boutique.countDocuments({ status: true });
};

module.exports = { createBoutique, getAllBoutiques, getBoutiqueById, updateBoutique, deleteBoutique, getTopBoutiques,getTotalBoutiques };