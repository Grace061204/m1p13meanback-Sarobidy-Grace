const express = require('express');
const router = express.Router();
const categorieBoutiqueController = require('../../controller/categorieBoutique/CategorieBoutiqueController');
const authMiddleware = require('../authMiddleware');

router.post('/new', authMiddleware, categorieBoutiqueController.create);
router.get('/', authMiddleware, categorieBoutiqueController.getAll);
router.get('/:id', authMiddleware, categorieBoutiqueController.getById);
router.put('/:id', authMiddleware, categorieBoutiqueController.update);
router.patch('/desactiver/:id', authMiddleware, categorieBoutiqueController.desactiver);

module.exports = router;