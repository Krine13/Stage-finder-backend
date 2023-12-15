const mongoose=require('mongoose');


const recruteurSchema=mongoose.Schema({
    prenom:String,
    email:String,
    nom:String,
    secteur:String,
    password:String,
    token:String,
    
});
    

    
    



   
   

const recruteur=mongoose.model('recruteur',recruteurSchema);
module.exports=recruteur;