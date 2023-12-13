const mongoose =require('mongoose');

const stagiaireSchema = mongoose.Schema({
    email: String,
    nom: String,
    prenom: String,
    metier: String,
    portfolio: String,
    image: String,
    cv: String,
    password: String,
    token: String,
});


const stagiaire = mongoose.model('stagiaire', stagiaireSchema);

module.exports = stagiaire;