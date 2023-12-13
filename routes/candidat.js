var express = require('express');
var router = express.Router();
const candidat=require('../models/candidat');
const checkBody=require('../Module/checkBody')
const bcrypt=require('bcrypt');
const uid2=require('uid2')
require('../models/connection');

const fetch = require('node-fetch');

// recuperer les données d'inscription du recruteur//

  router.post('/signup',(req,res)=> {
    if (!checkBody(req.body, ['name', 'email', 'password'])) {
        res.send ("Bienvenue sur Stage finder");
            
         return;
  
    };
  
      candidat.findOne({ email: req.body.email}).then(data => {
        if (data === null) {
          const hash = bcrypt.hashSync(req.body.password, 10);
        

     
          const newCandidat = new candidat({
          email: req.body.email,
          nom:req.body.name,
          adress:req.body.adress,
          metier:req.body.metier,
          annonce:req.body.annonce,
          photo:req.body.photo,
          password: hash,
          token:uid2(32),
          });
          newCandidat.save().then(newDoc => {
            res.json({ result: true, token: newDoc.token })
         });
        
        } else {
            // User already exists in database
            res.json({ result: false, error: 'User already exists' })

         } 

         candidat.save
        });
      
        
      
      })
        


//recuperer les donnees de connection du recruteur//
  
  router.post('/login', (req, res) => {
   
   if (checkBody(req.body, ['email','password'])){
   res.send ("Ravis de vous revoir!");
  } else {
    res.status(401).send ('identifiant non reconnu')
  } 

  candidat.findOne({ email: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
      return;
    } else {
      res.json({ result: false, error: 'utilisateur inconnu' });
    }
  });
});

  




module.exports = candidat;
