const bcrypt = require('bcrypt');
const UtilisateurResponsable = require('../../models/utilisateur/UtilisateurResponsable');
const jwt = require('jsonwebtoken');

const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.mdp, 10);
  const user = new UtilisateurResponsable({ ...data, mdp: hashedPassword });
  return await user.save();
};

const findAllUser = async () => UtilisateurResponsable.find().populate('idBoutique');

const loginUser = async (email, mdp) => {
  const user = await UtilisateurResponsable.findOne({ email }).populate('idBoutique');
  if (!user) throw new Error('Utilisateur non trouvé');

  const isMatch = await bcrypt.compare(mdp, user.mdp);
  if (!isMatch) throw new Error('Mot de passe incorrect');

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      idBoutique: user.idBoutique?._id || null,
    },
    process.env.JWT_SECRET,
    { expiresIn: '5h' }
  );

    return { user, token };
};

const updateUser = async (id, data, actionUserId) => {
  const user = await UtilisateurResponsable.findById(id);
  if (!user) throw new Error('Utilisateur non trouvé');

  await historiqueService.createHistorique({
    nom: user.nom,
    prenom: user.prenom,
    mdp: user.mdp,
    email: user.email,
    tel: user.tel,
    role: user.role,
    idboutique: user.idboutique,
    idutilisateur: actionUserId, //
    action: 1
  });

  if (data.mdp) {
    data.mdp = await bcrypt.hash(data.mdp, 10);
  }
  Object.assign(user, data);
  return await user.save();
};

const deleteUserWithHistory = async (userId, actionUserId) => {
  const user = await UtilisateurResponsable.findById(userId);
  if (!user) throw new Error("Utilisateur non trouvé");

  
  await historiqueService.createHistorique({
    nom: user.nom,
    prenom: user.prenom,
    mdp: user.mdp,
    email: user.email,
    tel: user.tel,
    role: user.role,
    idboutique: user.idboutique,
    idutilisateur: actionUserId, //
    action: 0
  });

  return await UtilisateurResponsable.findByIdAndDelete(userId);
};

module.exports = {
    createUser, findAllUser, loginUser, updateUser, deleteUserWithHistory
};

module.exports = { createUser, findAllUser, loginUser };