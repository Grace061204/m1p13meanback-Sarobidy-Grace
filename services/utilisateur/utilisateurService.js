const bcrypt = require('bcrypt');
const UtilisateurResponsable = require('../../models/utilisateur/UtilisateurResponsable');
const jwt = require("jsonwebtoken");


const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.mdp, 10); 
    const user = new UtilisateurResponsable({
        ...data,
        mdp: hashedPassword
    });
    console.log(user);
    return await user.save();

};

const findAllUser = async () => UtilisateurResponsable.find();

const loginUser = async (email, mdp) => {
    const user = await UtilisateurResponsable.findOne({ email });
    if (!user) throw new Error("Utilisateur non trouvé");

    const isMatch = await bcrypt.compare(mdp, user.mdp);
    if (!isMatch) throw new Error("Mot de passe incorrect");

    const token = jwt.sign(
        { 
            id: user._id, 
            role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
    );

    return { user, token };
};
module.exports = {
    createUser, findAllUser, loginUser
};
