var express = require('express');
var router = express.Router();
require('../models/connection');
const stagiaire = require('../models/stagiaire');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const uniqid = require('uniqid');
const cv = require('../models/cv');
const { checkBody } = require('../modules/checkBody');

/*cloudinary.config({ 
  cloud_name: 'dwambgkc1', 
  api_key: '763933493646592 ', 
  api_secret: 'Id0Mxh6Mroy64yWIBHd_WXycFpc' 
});
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

  router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['nom', 'prenom', 'email', 'presentation','metier', 'password', ])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  
  // Check if the user has not already been registered
  stagiaire.findOne({ email: req.body.email }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newStagiaire = new stagiaire({
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        metier: req.body.metier,
        portfolio: req.body.portfolio,
        presentation: req.body.presentation,
        //image: req.body.image,
        //cv: req.body.cv,
        password: hash,
        token: uid2(32), 
      });
    
      newStagiaire.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'Stagiaire déja existant' });
    }
  });
});




router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Champs vide' });
    return;
  }

  stagiaire.findOne({ email: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});


router.delete('/delete', (req, res) => {
  stagiaire.findOneAndDelete({ email: req.body.email }).then(data => {
    if (data) {
      res.json({ result: true});
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});
router.post('/cv', (req, res) => {
  if (!checkBody(req.body, ['url' ])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  cv.findOne({ url: req.body.url }).then(data => {
    if (data === null) {

      const newCv = new cv({
        url: req.body.url,
      });

      newCv.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'Cv déja existant' });
    }
  });
});
router.get("/cv", (req, res) => {
  cv.find().populate('stagiaire').then(data => res.json({data}))
})



router.delete('/cv/delete', (req, res) => {
 cv.findOneAndDelete({ url: req.body.url }).then(data => {
    if (data) {
      res.json({ result: true});
    } else {
      res.json({ result: false, error: 'Cv not found' });
    }
  });
});

module.exports = router;







