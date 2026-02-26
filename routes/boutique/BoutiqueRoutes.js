const express = require('express');
const router = express.Router();
const boutiqueController = require('../../controller/boutique/BoutiqueController');
const authMiddleware = require('../authMiddleware');

router.post('/new', authMiddleware, boutiqueController.create);
router.get('/', authMiddleware, boutiqueController.getAll);
router.get('/:id', authMiddleware, boutiqueController.getById);
router.put('/:id', authMiddleware, boutiqueController.update);
router.patch('/desactiver/:id', authMiddleware, boutiqueController.desactiver);

module.exports = router;