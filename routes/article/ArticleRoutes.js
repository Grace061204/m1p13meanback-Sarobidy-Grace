const express = require('express');
const router = express.Router();
const c = require('../../controller/article/ArticleController');
const auth = require('../authMiddleware');

router.post('/new', auth, c.create);
router.get('/en-alerte', auth, c.enAlerte);
router.get('/mouvements', auth, c.getAllMouvements);
router.get('/', auth, c.getAll);
router.get('/:id', auth, c.getById);
router.put('/:id', auth, c.update);
router.patch('/desactiver/:id', auth, c.desactiver);
router.patch('/entree/:id', auth, c.entreeStock);
router.get('/mouvements/:id', auth, c.getMouvements);
router.get('/historique-prix/:id', auth, c.getHistoriquePrix);

module.exports = router;