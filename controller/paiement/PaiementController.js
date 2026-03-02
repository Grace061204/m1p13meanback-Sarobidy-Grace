const service = require('../../services/paiement/PaiementService');

exports.initier = async (req, res) => {
  try {
    const paiement = await service.initierPaiement(req.body);
    res.status(201).json({ message: 'Paiement soumis, en attente de confirmation', data: paiement });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.confirmer = async (req, res) => {
  try {
    const paiement = await service.confirmerPaiement(req.params.id);
    res.status(200).json({ message: 'Paiement confirmé', data: paiement });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.rejeter = async (req, res) => {
  try {
    const paiement = await service.rejeterPaiement(req.params.id, req.body.note);
    res.status(200).json({ message: 'Paiement rejeté', data: paiement });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.idVente) filter.idVente = req.query.idVente;

    const paiements = await service.getAllPaiements(filter);
    res.status(200).json({ message: 'OK', data: paiements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByVente = async (req, res) => {
  try {
    const paiement = await service.getPaiementByVente(req.params.idVente);
    res.status(200).json({ message: 'OK', data: paiement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};