const mongoose=require('mongoose');
    

const candidatSchema=mongoose.Schema({
lastName:String,
firstname:String,
email:String,
address:String,
secteur:String,
description:String,
image:String,
password:String,
portfolio:String,
token:String,




});
const candidat=mongoose.model('candidat',candidatSchema);
module.exports=candidat;