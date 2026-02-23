const loyerService = require('../../services/loyer/LoyerService');

exports.getByContrat = async (req, res) => {
  try {
    const loyers = await loyerService.getLoyersByContrat(req.params.idContrat);
    res.status(200).json({ message: 'OK', data: loyers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const loyers = await loyerService.getAllLoyers(filter);
    res.status(200).json({ message: 'OK', data: loyers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.payer = async (req, res) => {
  try {
    const loyer = await loyerService.payerLoyer(req.params.id);
    res.status(200).json({ message: 'Loyer marqué comme payé', data: loyer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.enRetard = async (req, res) => {
  try {
    const loyers = await loyerService.getLoyersEnRetard();
    res.status(200).json({ message: 'OK', data: loyers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const stats = await loyerService.getDashboardStats();
    res.status(200).json({ message: 'OK', data: stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};