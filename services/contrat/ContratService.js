const Contrat = require('../../models/contrat/Contrat');
const Loyer = require('../../models/loyer/Loyer');

// Généreration automatiquement des loyers à la création du contrat
const genererLoyers = async (contrat) => {
  const loyers = [];
  const dateDebut = new Date(contrat.dateDebut);
  const dateFin = new Date(contrat.dateFin);

  let current = new Date(dateDebut);
  while (current <= dateFin) {
    const dateEcheance = new Date(current.getFullYear(), current.getMonth(), 3); 
    loyers.push({
      idContrat: contrat._id,
      mois: current.getMonth() + 1,
      annee: current.getFullYear(),
      montant: contrat.montantMensuel,
      dateEcheance,
      status: 'en_attente',
    });
    current.setMonth(current.getMonth() + 1);
  }
  await Loyer.insertMany(loyers);
};

const createContrat = async (data) => {
  const contrat = await new Contrat(data).save();
  await genererLoyers(contrat);
  return contrat;
};

const getAllContrats = async () => Contrat.find().populate('idBoutique');

const getContratById = async (id) => Contrat.findById(id).populate('idBoutique');

const updateContrat = async (id, data) => {
  const contrat = await Contrat.findByIdAndUpdate(id, data, { new: true });
  return contrat;
};

const resilierContrat = async (id) => {
  return Contrat.findByIdAndUpdate(id, { status: 'resilie' }, { new: true });
};

// Mettre à jour automatiquement les statuts en retard
const updateStatutsEnRetard = async () => {
  const now = new Date();
  await Loyer.updateMany(
    { status: 'en_attente', dateEcheance: { $lt: now } },
    { status: 'en_retard' }
  );
};

module.exports = { createContrat, getAllContrats, getContratById, updateContrat, resilierContrat, updateStatutsEnRetard };