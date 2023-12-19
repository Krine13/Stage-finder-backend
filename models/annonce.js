const mongoose=require('mongoose');
const annonceSchema=mongoose.Schema({
    date: Date,
    nom: String,
    metier: String,
    annonce: String,
    recruteur: { type: mongoose.Schema.Types.ObjectId, ref: 'recruteur' },

});

const Annonce=mongoose.model('annonces',annonceSchema);

module.exports=Annonce;