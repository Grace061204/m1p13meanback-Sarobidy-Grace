const express = require('express');
const router = express.Router();
const utilisateurController = require('../../controller/utilisateur/utilisateurController');
const authMiddleware = require('../authMiddleware');

router.post('/new', authMiddleware,utilisateurController.createResponsable);
router.post('/nouveau', utilisateurController.createResponsable);

router.get('/', authMiddleware,utilisateurController.getUtilisateurs);
// router.get('/', utilisateurController.getUtilisateurs);

router.post('/login', utilisateurController.loginResponsable);
router.put('/:id', authMiddleware, utilisateurController.updateUtilisateur);

router.delete('/:id', utilisateurController.deleteUtilisateur);
router.get('/:id', authMiddleware,utilisateurController.getById);

module.exports = router;
