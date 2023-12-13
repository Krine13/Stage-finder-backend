var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const uid2=require('uid2');
const fetch = require('node-fetch');
const recruteur=require('../models/recruteur');
const {checkBody} = require('../Module/checkBody');
require('../models/connection');
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
       metier:req.body.metier,
       annonce:req.body.annonce,
       logo:req.body.photo,
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
     return;
   }
 });
});




module.exports = recruteur;

