const express = require('express');
const router = express.Router();
const utilisateurController = require('../../controller/utilisateur/utilisateurController');
const authMiddleware = require('../authMiddleware');

router.post('/new',authMiddleware, utilisateurController.createResponsable);
router.get('/', authMiddleware, utilisateurController.getUtilisateurs);
router.post('/login', utilisateurController.loginResponsable);

module.exports = router;
