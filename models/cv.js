const mongoose = require ('mongoose');

const cvSchema = mongoose.Schema({
    url: String,
    stagiaire: { type: mongoose.Schema.Types.ObjectId, ref: 'stagiaire' },
});
const cv = mongoose.model('cv', cvSchema);

 module.exports = cv;