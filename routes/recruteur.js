var express = require('express');
var router = express.Router();
require('../models/connection');
const bcrypt = require('bcrypt');
const uid2=require('uid2');
const fetch = require('node-fetch');
const recruteur=require('../models/recruteur');
const annonce=require('../models/annonce');
const evenement=require('../models/evenement');
const image_recruteur=require('../models/image_recruteur');
const {checkBody} = require('../Module/checkBody');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const uniqid = require('uniqid');

cloudinary.config({ 
    cloud_name: 'dwambgkc1', 
    api_key: '763933493646592 ', 
    api_secret: 'Id0Mxh6Mroy64yWIBHd_WXycFpc' 
  });




// recuperer les données d'inscription du recruteur//

router.post('/signUp',(req,res)=> {
   if (!checkBody(req.body, ['nom', 'email', 'password'])) {
        res.json ({result:false,error:"Il manque des elements pour t'enregister"});
       return;    
       
   
   };
  
    recruteur.findOne({ email: req.body.email}).then(data => {

      if (data === null) {
       const hash = bcrypt.hashSync(req.body.password, 10);
       
       const newRecruteur = new recruteur({
       email: req.body.email,
       nom:req.body.nom,
       prenom:req.body.prenom,
       metier:req.body.metier,
       annonce:req.body.annonce,
       logo:req.body.logo,
       password: hash,
       token:uid2(32),
       });

       newRecruteur.save().then(newDoc => {
         res.json({ result: true, token: newDoc.token })
       } );
      } else {
        res.json({result:false, error:'Deja inscrit'})
      }
       
       });
      
});

router.post('/upload', async (req, res) => {
  const photoPath = `./tmp/${uniqid()}.jpg`;
  const resultMove = await req.files.photoFromFront.mv(photoPath);


  if (!resultMove) {
  const resultCloudinary = await cloudinary.uploader.upload(photoPath);
  fs.unlinkSync(photoPath);
    res.json({ "result": true,
    url: resultCloudinary.secure_url });
  } else {
    res.json({ result: false, error: resultMove });
  }
});

router.post('/annonce',(req,res)=> {

  // verification de la totalite des données de l'annonce//
  
  if (!checkBody(req.body, ['contrat', 'adresse', 'secteur', 'title', 'description', 'remuneration','recruteur']
)) {
    res.json ({result:false,error:"Il manque des elements pour enregister ton annonce"});
   return;    
   
}
  /*annonce.findOne({ annonce: req.body.annonce}).then(data => {
  
    if (data === null)*/
    
   annonce.findOne({title:req.body.title})
   .populate('annonce')
   .then(data=>{

    if(data===null){
     
    const newAnnonce = new annonce({
    
     secteur: req.body.secteur,
     title: req.body.title,
     description:req.body.description,
     contrat:req.body.contrat,
     remuneration:req.body.remuneration,
   });
   newAnnonce.save().then(newDoc => {
    res.json({ result: true, token: newDoc.token })
  } );
 } else {
   res.json({result:false, error:'Deja inscrit'})
 }
}).catch(error=>{
  res.json({result:false, error:'erreur lors de la recherched/annonce existante'});
});
});


router.delete('/annonce/delete',(req,res)=>{
annonce.findOneAndDelete({title:req.body.title}).then(data=>{
  if(data){
    res.json({result:true});
    }else{
      res.json({result:false, error: 'annonce introuvable'})
    }
  });
})

  
/*router.put('/updateAnnonce/:title', (req, res) => {
  const annonceTitle = req.params.title;

  const updateFields={
    secteur:req.body.secteur,
    title:req.body.title,
    description:req.body.description,
    contrat:req.body.contrat,
    remuneration:req.body.remuneration,
  
  };*/

  /*annonce.findOneAndUpdate({ title: annonceTitle }, updatedFields, { new: true })
    .then(updatedAnnonce => {
      if (updatedAnnonce) {
        
        res.json({ result: true, message: 'Annonce mise à jour avec succès', updatedAnnonce });
      } else {
        
        res.json({ result: false, error: 'Annonce non trouvée' });
      }
    })
    .catch(error => {
      res.json({ result: false, error: 'Erreur lors de la mise à jour de l\'annonce', details: error.message });
    });
});*/

  // Assurez-vous de gérer la mise à jour de l'annonce ici
  // ...

  




   


    


  

 

 router.post('/evenement', (req, res) => {

 if (!checkBody(req.body, [ "adresse","secteur", "nom", "description", "remuneration",]
  )) {
      res.json ({result:false,error:"Il manque des elements pour enregister ton evenement"});
     return;    
     
    }
    evenement.findOne({ evenement: req.body.evenement}).then(data => {
  
      if (data === null) {
       
       
       const newEvenement = new evenement({
        date: req.body.date,
        nom: req.body.nom,
        secteur:req.body.secteur,
        presentation: req.body.presentation,
        inscription: req.body.inscription,
        image: req.body.image,
        adresse: req.body.adresse,
       });


   // sauvegarde et envoie sur la DB de l'événement. 
    
       newEvenement.save().then(newDoc => {
         res.json({ result: true, token: newDoc.token })
       } );
      } else {
        res.json({result:false, error:'aucun evenement n/est encore enregistré'})
      }
       
       });
      
  });

  router.delete('/evenement/delete',(req,res)=>{
    evenement.findOneAndDelete({nom:req.body.nom}).then(data=>{
      if(data){
        res.json({result:true});
        }else{
          res.json({result:false, error: 'evenement introuvable'})
        }
      });
    })
    
  
  
   



//recuperer les donnees de connection du recruteur//
  
router.post('/login', (req, res) => {
 
  if (checkBody(req.body, ['name','email','password'])){
   res.json ({result :true, message:"Ravis de vous revoir!"});
 } else {
    res.status(401).json ({error:'identifiant non reconnu'});
    return;
 }

 recruteur.findOne({ email: req.body.email }).then(data => {
   if (data && bcrypt.compareSync(req.body.password, data.password)) {
     res.json({ result: true, token: data.token });
   } else {
     res.json({ result: false, error: 'utilisateur inconnu' });
     
   }
 });
});







module.exports = router;

