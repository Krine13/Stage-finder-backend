const mongoose = require ('mongoose');

const imageStagiaireSchema = mongoose.Schema({
    url: String,
    stagiaire:{ type: mongoose.Schema.Types.ObjectId, ref: 'stagiaire' },
});
const image = mongoose.model('imageStagiaire', imageStagiaireSchema);

 module.exports = imageStagiaire;