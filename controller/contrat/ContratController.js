const contratService = require('../../services/contrat/ContratService');

exports.create = async (req, res) => {
  try {
    const contrat = await contratService.createContrat(req.body);
    res.status(201).json({ message: 'Contrat créé et loyers générés', data: contrat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    await contratService.updateStatutsEnRetard();
    const contrats = await contratService.getAllContrats();
    res.status(200).json({ message: 'OK', data: contrats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const contrat = await contratService.getContratById(req.params.id);
    res.status(200).json({ message: 'OK', data: contrat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const contrat = await contratService.updateContrat(req.params.id, req.body);
    res.status(200).json({ message: 'OK', data: contrat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resilier = async (req, res) => {
  try {
    const contrat = await contratService.resilierContrat(req.params.id);
    res.status(200).json({ message: 'Contrat résilié', data: contrat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};