const express = require('express');
const router = express.Router();
const loyerController = require('../../controller/loyer/LoyerController');
const authMiddleware = require('../authMiddleware');

router.get('/dashboard', authMiddleware, loyerController.dashboard);
router.get('/en-retard', authMiddleware, loyerController.enRetard);
router.get('/contrat/:idContrat', authMiddleware, loyerController.getByContrat);
router.get('/', authMiddleware, loyerController.getAll);
router.patch('/payer/:id', authMiddleware, loyerController.payer);

module.exports = router;