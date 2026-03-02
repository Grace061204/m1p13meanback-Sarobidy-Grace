const express = require('express');
const router = express.Router();
const c = require('../../controller/article/ArticleController');
const auth = require('../authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

router.post('/new', auth, c.create);
router.get('/en-alerte', auth, c.enAlerte);
router.get('/mouvements', auth, c.getAllMouvements);
router.get('/', auth, c.getAll);

// ⚠️ Les routes /:id EN DERNIER
router.get('/:id', auth, c.getById);
router.put('/:id', auth, c.update);
router.patch('/desactiver/:id', auth, c.desactiver);
router.patch('/entree/:id', auth, c.entreeStock);
router.get('/mouvements/:id', auth, c.getMouvements);
router.get('/historique-prix/:id', auth, c.getHistoriquePrix);

module.exports = router;