const express = require('express');
const router = express.Router();
const c = require('../../controller/vente/VenteController');
const auth = require('../authMiddleware');


router.post('/new', auth, c.create);
router.get('/stats', auth, c.stats);
router.get('/', auth, c.getAll);
router.get('/:id', auth, c.getById);
router.patch('/annuler/:id', auth, c.annuler);
router.post('/commande', auth, c.commande);
module.exports = router;