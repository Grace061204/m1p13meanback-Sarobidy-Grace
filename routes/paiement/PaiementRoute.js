const router = require('express').Router();
const ctrl   = require('../controllers/paiement/PaiementController');

// Client
router.post('/initier',             ctrl.initier);
router.get('/vente/:idVente',       ctrl.getByVente);

// Admin
router.get('/',                     ctrl.getAll);
router.put('/:id/confirmer',        ctrl.confirmer);
router.put('/:id/rejeter',          ctrl.rejeter);

module.exports = router;