const mongoose=require('mongoose');


const annonceSchema = mongoose.Schema({
    contrat:String,
    adresse:String,
    secteur:String,
    title:String,
    description:String,
    remuneration:Boolean,
    recruteur:[{ type: mongoose.Schema.Types.ObjectId, ref: 'recruteur' }],
    

   });



   const annonce=mongoose.model('annonce',annonceSchema);
   module.exports=annonce;