const service = require('../../services/paiement/PaiementModeService');

exports.add = async (req, res) => {
  try {
    const mode = await service.addPaiementMode(req.body);
    res.status(201).json({ message: 'Mode de paiement ajouté', data: mode });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getByBoutique = async (req, res) => {
  try {
    const modes = await service.getByBoutique(req.params.idBoutique);
    res.status(200).json({ message: 'OK', data: modes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const mode = await service.updatePaiementMode(req.params.id, req.body);
    res.status(200).json({ message: 'Mis à jour', data: mode });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const mode = await service.deletePaiementMode(req.params.id);
    res.status(200).json({ message: 'Supprimé', data: mode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};