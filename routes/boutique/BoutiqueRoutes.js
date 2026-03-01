const express = require('express');
const router = express.Router();
const boutiqueController = require('../../controller/boutique/BoutiqueController');
const authMiddleware = require('../authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});
router.post('/new', authMiddleware, boutiqueController.create);
router.get('/', authMiddleware, boutiqueController.getAll);
router.get('/:id', authMiddleware, boutiqueController.getById);
router.put('/:id', authMiddleware, boutiqueController.update);
router.patch('/desactiver/:id', authMiddleware, boutiqueController.desactiver);

module.exports = router;