const mongoose = require ('mongoose');

const recruteurSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    fonction: String,
    email: String,
    entreprise: String,
    secteur: String,
    //annonce:  { type: mongoose.Schema.Types.ObjectId, ref: 'annonce' },
   // evenement:  { type: mongoose.Schema.Types.ObjectId, ref: 'evenement' },
   // image:  { type: mongoose.Schema.Types.ObjectId, ref: 'image' },
    password: String,
    token: String,   
})
 const recruteur = mongoose.model('recruteur', recruteurSchema);

 module.exports = recruteur;