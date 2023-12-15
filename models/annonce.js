const mongoose=require('mongoose');
const annonceSchema=mongoose.Schema({
    
    title:String,
    description:String,

});

const annonce=mongoose.model('annonce',annonceSchema);
module.exports=annonce;