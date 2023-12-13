const mongoose = require ('mongoose');


const recruteurSchema = mongoose.Schema({
    email: String,
    entreprise: String,
    domaine: String,
    announce: String,
    adresse: String,
    password: String,
    token: String,
    image: String,
});


 const recruteur = mongoose.model('recruteur', recruteurSchema);

 module.exports = recruteur;