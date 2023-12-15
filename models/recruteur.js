const mongoose=require('mongoose');
const recruteurSchema=mongoose.Schema({
    email:String,
    nom:String,
    metier:String,
    annonce:String,
    logo:String,
    password:String,
    token:String
});

const recruteur=mongoose.model('recruteur',recruteurSchema);
module.exports=recruteur;