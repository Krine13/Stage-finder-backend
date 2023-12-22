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
const Annonce = require('../models/annonce')
const image = require('../models/image');
const candidat = require('../models/candidat');
/*cloudinary.config({ 
  cloud_name: 'dwambgkc1', 
  api_key: '763933493646592 ', 
  api_secret: 'Id0Mxh6Mroy64yWIBHd_WXycFpc' 
});*/

router.post('/signup', async (req, res) => {
    /*const photoResult = await cloudinary.uploader.upload(req.body.photo);
  // const photoPath = `./tmp/${uniqid()}.jpg`;
  // const resultMove = await req.files.photoFromFront.mv(photoPath);

  // if (!resultMove) {
  //   const resultCloudinary = await cloudinary.uploader.upload(photoPath);
  //   fs.unlinkSync(photoPath);
  //     res.json({ "result": true,
  //     url: resultCloudinary.secure_url });
  //   } else {
  //     res.json({ result: false, error: resultMove });
  //   }*/
    try {
        const { lastName, firstName, email, password , fonction, company, secteur, metier, annonce,} = req.body;

        // // Check if required fields are present
         if (!checkBody(req.body, ['lastName', 'firstName', 'email', 'password','fonction' ,'company',])) {
            return res.json({ result: false, error: 'Champs vide' });
        }

        // Check if the recruiter already exists
        const existingRecruteur = await recruteur.findOne({ email });

        if (!existingRecruteur) {
            // Hash the password
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Create a new recruiter
            const newRecruteur = new recruteur({
              lastName,
              firstName,
              email,
              password: hashedPassword,
              token: uid2(32),
              fonction, 
              company, 
              secteur,
              metier,
              annonce,
              });

            // Save the recruiter to the database
            const savedRecruteur = await newRecruteur.save();

            return res.json({ result: true, data: savedRecruteur });
        } else {
            return res.json({ result: false, error: 'Recruteur déjà existant' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ result: false, error: 'Erreur lors de la création du recruteur' });
    }
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Veuillez tout remplir' });
    return;
  }

  recruteur.findOne({ email: email }).then(data => {
    if (data && bcrypt.compareSync(password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'Utilisateur inexistant ou mot de passe erroné' });
    }
  });
});

router.delete('/delete', (req, res) => {
  recruteur.findOneAndDelete({ email: req.body.email }).then(data => {
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
      recruteur: req.body.recruteur
      });

      newEvenement.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      res.json({ result: false, error: 'Evenement déja existant' });
    }
  });
});

  

  
  
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
    if (!checkBody(req.body, ['date','nom','annonce'])) {
      res.json({ result: false, error: 'Champs vide' });
      return;
    }
    Annonce.findOne({ nom: req.body.nom }).then(data => {
      if (data === null) {
      const newAnnonce = new Annonce({

        date: req.body.date,
        nom: req.body.nom,
        metier: req.body.metier, 
        annonce: req.body.annonce,
        recruteur: req.body.recruteur
        });
        newAnnonce.save().then(newDoc => {
          console.log(newDoc);
          res.json({ result: true, data: newDoc});
        });
      } else {
        res.json({ result: false, error: 'Annonce déja existant' });
      }
    });
  });

  router.post("/annonce/quoi", (req, res) => {
    const metier = req.body.metier;

    console.log('from backend', metier);
    Annonce.find({ metier: metier }).populate('recruteur').then(data => res.json({ annonce:data }));
  });

  router.delete('/annonce', (req, res) => {
    Annonce.findOneAndDelete({ nom: req.body.nom }).then(data => {
      if (data) {
        res.json({ result: true});
      } else {
        res.json({ result: false, error: 'Annonce introuvable' });
      }
    });
  });

  router.get('/allCandidats', async (req, res) => {
    try {
      // Utilisez votre modèle de candidat pour récupérer tous les profils
      const candidats = await candidat.find({});
  
      // Renvoyez la liste complète des candidats en tant que réponse
      res.json({ success: true, data: candidats });
    } catch (error) {
      console.error('Erreur lors de la récupération des candidats :', error);
      res.status(500).json({ success: false, error: 'Erreur lors de la récupération des candidats.' });
    }
  });
  
module.exports = router;
