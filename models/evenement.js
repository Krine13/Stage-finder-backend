const mongoose = require ('mongoose');


const evenementSchema = mongoose.Schema({
    date: String,
    nom: String,
    presentation: String,
    inscription: String,
    image: String,
});


 const evenement = mongoose.model('evenement', evenementSchema);

 module.exports = evenement;