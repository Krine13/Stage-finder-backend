const mongoose=require('mongoose');
    

const candidatSchema=mongoose.Schema({
    
    nom:String,
    prenom:String,
    email:String,
    adresse:String,
    secteur:String,
    description:String,
    photo:String,
    password:String,
    portfolio:String,
    token:String,
    
    
    
    
});




const candidat=mongoose.model('candidat',candidatSchema);
module.exports=candidat;