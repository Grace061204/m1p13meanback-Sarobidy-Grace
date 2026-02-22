const UtilisateurResponsable = require("../../models/utilisateur/Utilisateur");
const utilisateurService =  require("../../services/utilisateur/utilisateurService");
const Utilisateur = require('../../models/utilisateur/Utilisateur');


exports.createResponsable = async (req, res) => {
    try {
        // console.log(req.body); 
        // const user = new UtilisateurResponsable(req.body);
        await utilisateurService.createUser(req.body);
        res.status(200).json({
            message: "OK",
            data: req.body
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};  

exports.getUtilisateurs = async (req, res) => {
    try {
        // const utilisateurs = await utilisateurService.findAllUser();
         const utilisateurs = await Utilisateur.find().select('-mdp');
// res.json(users);
        res.status(200).json({
            message: "OK",
            data: utilisateurs
        });
        // res.json(utilisateurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUtilisateur = async (req, res) => {
  try {
    const userId = req.params.id;           
    const actionUserId = 1; 
    const updateData = req.body;            

    const updatedUser = await utilisateurService.updateUser(userId, updateData, actionUserId);

    res.status(200).json({
      message: 'Utilisateur modifié avec succès',
      data: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.loginResponsable = async (req, res) => {
    try {
        const { email, mdp } = req.body;

        const { user, token } = await utilisateurService.loginUser(email, mdp);

        const { mdp: _, ...userWithoutPwd } = user.toObject();

        res.status(200).json({
            message: "Connexion réussie",
            user: userWithoutPwd,
            token: token
        });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


