var express = require('express');
var router = express.Router();
const annonce=require('../models/annonce');

const fetch = require('node-fetch');

// recuperer les données d'inscription du recruteur//

  router.post('/annonce',(req,res)=> {

    // recuperer les données de l'annonce//
    
    const newAnnonce=new annonce({
      
      title:req.body.title,
      description: req.body.description,
      
    });
    newAnnonce.save();
  
    

   });
  
  module.exports=annonce;
  
    

     

