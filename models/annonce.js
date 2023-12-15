const mongoose = require ('mongoose');

const annonceSchema = mongoose.Schema({
    date: Date,
    nom: String,
    secteur: String,
    metier: String,
    annonce: String,
    recruteur: { type: mongoose.Schema.Types.ObjectId, ref: 'recruteur' },
});
const annonce = mongoose.model('annonce', annonceSchema);

 module.exports = annonce;