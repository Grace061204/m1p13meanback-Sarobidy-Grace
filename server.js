const dns = require('node:dns');
dns.setServers(['8.8.8.8','1.1.1.1']);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/utilisateur', require('./routes/utilisateur/utilisateurRoutes'));

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
