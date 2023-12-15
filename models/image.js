const mongoose = require ('mongoose');

const imageSchema = mongoose.Schema({
    url: String,
    recruteur:{ type: mongoose.Schema.Types.ObjectId, ref: 'recruteur' },
});
const image = mongoose.model('image', imageSchema);

 module.exports = image;