const express = require('express');
const router = express.Router();
const contratController = require('../../controller/contrat/ContratController');
const authMiddleware = require('../authMiddleware');

router.post('/new', authMiddleware, contratController.create);
router.get('/', authMiddleware, contratController.getAll);
router.get('/totalActif', authMiddleware,contratController.getTotalContratsActifs);
router.get('/:id', authMiddleware, contratController.getById);
router.put('/:id', authMiddleware, contratController.update);
router.patch('/resilier/:id', authMiddleware, contratController.resilier);
//dash


module.exports = router;