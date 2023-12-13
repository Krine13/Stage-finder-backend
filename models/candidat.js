const mongoose=require('mongoose');

const candidatSchema=mongoose.Schema({
    
    nom:String,
    email:String,
    adress:String,
    metier:String,
    annonce:String,
    photo:String,
    password:String
    
});

const candidat=mongoose.model('candidat',candidatSchema);
module.exports=candidat;