var express = require('express');
var router = express.Router();
const candidat=require('../models/candidat');
const {checkBody}=require('../Module/checkBody')
const bcrypt=require('bcrypt');
const uid2=require('uid2')
require('../models/connection');

const fetch = require('node-fetch');
//const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const uniqid = require('uniqid');
const cv_candidat = require('../models/cv_candidat');

/*cloudinary.config({ 
    cloud_name: 'dwambgkc1', 
    api_key: '763933493646592 ', 
    api_secret: 'Id0Mxh6Mroy64yWIBHd_WXycFpc' 
  });*/

// recuperer les données d'inscription du recruteur//

router.post('/signup', (req, res) => {

  if (!checkBody(req.body, [ "email","adresse","secteur", "nom", "description", "remuneration",]
   )) {
       res.json ({result:false,error:"Il manque des elements pour enregister ton inscription"});
      return;    
 
     }
     candidat.findOne({ email: req.body.email}).then(data => {
      if (data === null) {
      const hash=bcrypt.hashSync(req.body.password,10);
   
      
        
        
        const newCandidat = new candidat({
          nom:req.body.nom,
          email:req.body.email,
          adresse:req.body.adresse,
          secteur:req.body.secteur,
          photo:req.body.photo,
          password:hash,
          portfolio:req.body.portfolio,
          token:uid2(32),
        }); 
       newCandidat.save().then(newDoc=>{
        res.json({result:true,token:newDoc.token});
       });
      }else{
        res.json({result:false,error:'candidat deja enregistre' });
      }
        
       
       });
    })
      
      
/*router.post('/upload', async (req, res) => {
    const photoPath = `./tmp/${uniqid()}.jpg`;
    const resultMove = await req.files.photoFromFront.mv(photoPath);


    if (!resultMove) {
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);
    fs.unlinkSync(photoPath);
      res.json({ "result": true,
      url: resultCloudinary.secure_url });
    } else {
      res.json({ result: false, error: resultMove });
    }*/
  
      
      
      
   


//recuperer les donnees de connection du recruteur//
  
router.post('/login', (req, res) => {
 
  if (checkBody(req.body, ['name','email','password'])){
   res.json ({result :true, message:"Ravis de vous revoir!"});
 } else {
    res.status(401).json ({error:'identifiant non reconnu'});
    return;
 }

 candidat.findOne({ email: req.body.email }).then(data => {
   if (data && bcrypt.compareSync(req.body.password, data.password)) {
     res.json({ result: true, token: data.token });
   } else {
     res.json({ result: false, error: 'utilisateur inconnu' });
     
   }
 });
});


router.delete('/delete',(req,res)=>{
  candidat.findOneAndDelete({email:req.body.email}).then(data=>{
    if(data){
      res.json({result:true});
      }else{
        res.json({result:false, error: 'utilisateur introuvable'})
      }
    });
  })





router.post('/cv_candidat',(req,res)=> {

  // verification de la totalite des données de l'annonce//
  
  if (!checkBody(req.body, ['url']
)) {
    res.json ({result:false,error:"Il manque des elements pour enregister ton cv"});
   return;    
   
}
  cv_candidat.findOne({url:req.body.url})
   .then(data=>{
    
   if(data===null){
     
    const newCv = new cv({
    newCv:req.body.newCv,
   });
   newCv.save().then(newDoc => {
    res.json({ result: true, token: newDoc.token })
  } );
 } else {
   res.json({result:false, error:'Deja enregistrer'})
 }
}).catch(error=>{
  res.json({result:false, error:'erreur lors de la recherche d/un cv existant'});
});
});

router.delete('/cv_candidat/delete',(req,res)=>{
  cv_candidat.findOneAndDelete({url:req.body.url}).then(data=>{
    if(data){
      res.json({result:true});
      }else{
        res.json({result:false, error: 'cv introuvable'})
      }
    });
  })
  






module.exports = router;
