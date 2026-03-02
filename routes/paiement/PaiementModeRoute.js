const router = require('express').Router();
const ctrl   = require('../controllers/paiement/PaiementModeController');

router.post('/',                        ctrl.add);
router.get('/boutique/:idBoutique',     ctrl.getByBoutique);
router.put('/:id',                      ctrl.update);
router.delete('/:id',                   ctrl.delete);

module.exports = router;