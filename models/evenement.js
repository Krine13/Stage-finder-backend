const mongoose=require('mongoose');
const evenementSchema = mongoose.Schema({
   
    date: Date,
    nom: String,
    presentation: String,
    inscription: String,
    image: String,
    recruteur: { type: mongoose.Schema.Types.ObjectId, ref: 'recruteur' },
});
    const evenement = mongoose.model('evenement', evenementSchema);
    module.exports = evenement;