const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

require('./models/article/Article');
require('./models/vente/Vente');
require('./models/detailVente/DetailVente');
require('./models/mouvementStock/MouvementStock');
require('./models/historiquePrix/HistoriquePrix');

//Routes
app.use('/user', require('./routes/utilisateur/utilisateurRoutes'));
app.use('/public', require('./routes/public/publicRoutes'));
app.use('/article', require('./routes/article/articleRoutes'));
app.use('/vente', require('./routes/vente/venteRoutes'));
app.use('/categorieBoutique', require('./routes/categorieBoutique/CategorieBoutiqueRoutes'));
app.use('/boutique', require('./routes/boutique/BoutiqueRoutes'));
app.use('/contrat', require('./routes/contrat/ContratRoutes'));
app.use('/loyer', require('./routes/loyer/LoyerRoutes'));

// connexion mongo puis demarrage serveur
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecte");
    app.listen(PORT, () => {
      console.log(`Serveur demarre sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erreur MongoDB", err);
  });
