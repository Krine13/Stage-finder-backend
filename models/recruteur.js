const mongoose=require('mongoose');



const recruteurSchema=mongoose.Schema({
    email:String,
    lastName:String,
    firsName:String,
    secteur:String,
    company:String,
    fonction:String,
    metier:String,
    annonce:String,
    image:String,
    password:String,
    token:String
});

const recruteur=mongoose.model('recruteur',recruteurSchema);
module.exports=recruteur;


