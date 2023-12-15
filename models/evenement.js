const mongoose=require('mongoose');

const evenementSchema = mongoose.Schema({
    date: String,
    nom: String,
    adresse:String,
    secteur:String,
    presentation: String,
    inscription: String,
    remuneration:Boolean,
    image:String,
    recruteur:[{ type: mongoose.Schema.Types.ObjectId, ref: 'recruteur' }],
    
});

const evenement=mongoose.model('evenement',evenementSchema);
module.exports=evenement;