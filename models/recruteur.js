const mongoose=require('mongoose');
const recruteurSchema=mongoose.Schema({
    email:String,
    nom:String,
    metier:String,
    annonce:String,
});

const recruteur=mongoose.model('recruteurs,recruteurSchema');
module.export=recruteur;