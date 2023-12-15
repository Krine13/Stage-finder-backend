const mongoose=require('mongoose')


const image_recruteurSchema=mongoose.Schema({
    url:String,
    recruteur:[{ type: mongoose.Schema.Types.ObjectId, ref: 'recruteur' }],
  })







  const image_recruteur=mongoose.model('image_recruteur',image_recruteurSchema);
  module.exports=image_recruteur;