var express = require('express');
var router = express.Router();
require('../models/connection');
const recruteur = require('../models/recruteur');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/checkBody');
//const cloudinary = require('cloudinary').v2;
//const fs = require('fs');
//const uniqid = require('uniqid');
const evenement = require('../models/evenement');
const annonce = require('../models/annonce')
//const image = require('../models/image');

/*cloudinary.config({ 
  cloud_name: 'dwambgkc1', 
  api_key: '763933493646592 ', 
  api_secret: 'Id0Mxh6Mroy64yWIBHd_WXycFpc' 
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
  };
  });*/
  router.post('/signup', async (req, res) => {
    try {
      if (!checkBody(req.body, ['nom', 'prenom', 'email', 'entreprise', 'password', 'secteur'])) {
        res.json({ result: false, error: 'Champs vide' });
        return;
      }
  
      // Vérifie si le compte existe déjà
      const existingRecruteur = await recruteur.findOne({ email: req.body.email });
  
      if (!existingRecruteur) {
        const hash = bcrypt.hashSync(req.body.password, 10);
  
        const newRecruteur = new recruteur({
          nom: req.body.nom,
          prenom: req.body.prenom,
          fonction: req.body.function,
          email: req.body.email,
          entreprise: req.body.entreprise,
        //  secteur: req.body.secteur,
         // annonce: req.body.annonce,
         // evenement: req.body.evenement,
          image: req.body.image,
          password: hash,
          token: uid2(32),
        });
  
        // Sauvegarder le recruteur
        const savedRecruteur = await newRecruteur.save();
  
        res.json({ result: true, data: newRecruteur });
      } else {
        res.json({ result: false, error: 'Recruteur déjà existant' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false, error: 'Erreur lors de la création du recruteur' });
    }
  })
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Veuillez tout remplir' });
    return;
  }

  recruteur.findOne({ email: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'Utilisateur inexistant ou mot de passe erroné' });
    }
  });
});

router.delete('/delete', (req, res) => {
  recruteur.findOneAndDelete({ email: req.params.email }).then(data => {
    if (data) {
      res.json({ result: true});
    } else {
      res.json({ result: false, error: 'Recruteur introuvable' });
    }
  });
});

  router.post('/evenement', (req, res) => {
    if (!checkBody(req.body, ['date','nom','presentation'])) {
      res.json({ result: false, error: 'Champs vide' });
      return;
    }
    // Verifie si evenement existe déja
    recruteur.findOne({ nom: req.body.nom }).then(data => {
      if (data === null) { 
      
      const newEvenement = new evenement({
        date :req.body.date,
        nom : req.body.nom,
        inscription : req.body.inscription,
        presentation : req.body.presentation,
        image : req.body.image,
        });
  
        newEvenement.save().then(newDoc => {
          res.json({ result: true, token: newDoc.token });
        });
      } else {
        res.json({ result: false, error: 'Evenement déja existant' });
      }
    });
  });

  router.get("/evenement", (req, res) => {
    evenement.find().populate('recruteur').then(data => res.json({data}))
  })

  
  
  router.delete('/evenement/delete', (req, res) => {
    evenement.findOneAndDelete({ nom: req.body.nom }).then(data => {
      if (data) {
        res.json({ result: true});
      } else {
        res.json({ result: false, error: 'Evenement introuvable' });
      }
    });
  });

  router.post('/annonce', (req, res) => {
    if (!checkBody(req.body, ['date','nom','presentation'])) {
      res.json({ result: false, error: 'Champs vide' });
      return;
    }
  
    
    annonce.findOne({ nom: req.body.nom }).then(data => {
      if (data === null) {
        
  
        
      const newAnnonce = new annonce({
        date: req.body.date,
        nom: req.body.nom,
        metier: req.body.metier, 
        annonce: req.body.annonce,
        recruteur: req.body.recruteur
        });
  
        newAnnonce.save().then(newDoc => {
          res.json({ result: true, data: newDoc});
        });
      } else {
        res.json({ result: false, error: 'Annonce déja existant' });
      }
    });
  });
  
  router.get("/annonce", (req, res) => {
    annonce.find().populate('recruteur').then(data => res.json({data}))
  })

  router.delete('/annonce/delete', (req, res) => {
    annonce.findOneAndDelete({ nom: req.body.nom }).then(data => {
      if (data) {
        res.json({ result: true});
      } else {
        res.json({ result: false, error: 'Annonce introuvable' });
      }
    });
  });

module.exports = router;
