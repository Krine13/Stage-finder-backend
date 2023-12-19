const mongoose = require ('mongoose');

const photoCandidatSchema = mongoose.Schema({
    url: String,
    candidat:{ type: mongoose.Schema.Types.ObjectId, ref: 'candidat' },
});
const photo = mongoose.model('photoCandidat', photoCandidatSchema);

 module.exports = photoCandidat;