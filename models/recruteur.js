const mongoose=require('mongoose');



const recruteurSchema=mongoose.Schema({
    email:String,
    nom:String,
    prenom:String,
    secteur:String,
    entreprise:String,
    fonction:String,
    metier:String,
    annonce:String,
    image:String,
    password:String,
    token:String
});

const recruteur=mongoose.model('recruteur',recruteurSchema);
module.exports=recruteur;


