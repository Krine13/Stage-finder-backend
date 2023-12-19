const mongoose=require('mongoose')

const cv_candidatSchema=mongoose.Schema({
url:String,
candidat:[{ type: mongoose.Schema.Types.ObjectId, ref: 'candidat' }],

});

const cv_candidat=mongoose.model('cv_candidat',cv_candidatSchema);
module.exports=cv_candidat;   