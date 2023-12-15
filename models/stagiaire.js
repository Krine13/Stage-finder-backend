const mongoose =require('mongoose');

const stagiaireSchema = mongoose.Schema({
    email: String,
    nom: String,
    prenom: String,
    metier: String,
    presentation: String,
    portfolio: String,
    //image: String,
    //cv: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cv' }],
    password: String,
    token: String,
})


const stagiaire = mongoose.model('stagiaire', stagiaireSchema);

module.exports = stagiaire;