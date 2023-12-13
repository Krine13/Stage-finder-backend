var express = require('express');
var router = express.Router();
require('../models/connection');
const recruteur = require('../models/recruteur');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');



router.post('/signup', async (req, res) => {
  try {
    const { email, entreprise, domaine, annonce, adresse, image, password, } = req.body;

    // Vérification de l'existence du recruteur
    const existingRecruteur = await recruteur.findOne({ email });
    if (existingRecruteur) {
      return res.status(400).json({ message: 'Recruteur already exists' });
    }

    // Hash du mot de passe(x10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du compte recruteur avec un token unique
    const newRecruteur= new recruteur({
      email,
      entreprise,
      domaine,
      annonce,
      adresse,
      image,
      password: hashedPassword,
      token: uid2(32),
    });

    // Sauvegarde dans la base de données
    await newRecruteur.save();

    res.status(201).json({ message: 'Signup successful', token: newRecruteur.token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/signin', (req, res) => {
    //const { email, password } = req.body;
  
    recruteur.findOne({ email: req.body.email }).then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({ result: true, token: data.token });
      } else {
        res.json({ result: false, error: 'User not found or wrong password' });
      }
    });
  });
  
  router.delete('/delete', (req, res) => {
    recruteur.findOneAndDelete({ email: req.params.email }).then(data => {
      if (data) {
        res.json({ result: true});
      } else {
        res.json({ result: false, error: 'User not found' });
      }
    });
  });
  module.exports = router;