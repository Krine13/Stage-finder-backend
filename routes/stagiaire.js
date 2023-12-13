var express = require('express');
var router = express.Router();
require('../models/connection');
const stagiaire = require('../models/stagiaire');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const { email, nom, prenom, presentation, metier, portfolio, image, cv, password } = req.body;

    // Vérification de l'existence du stagiaire
    const existingStagiaire = await stagiaire.findOne({ email });
    if (existingStagiaire) {
      return res.status(400).json({ message: 'Stagiaire already exists' });
    }

    // Hash du mot de passe(x10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du compte stagiaire avec un token unique
    const newStagiaire = new stagiaire({
      email,
      nom,
      prenom,
      presentation,
      metier,
      portfolio,
      image,
      cv,
      password: hashedPassword,
      token: uid2(32),
    });

    // Sauvegarde dans la base de données
    await newStagiaire.save();

    res.status(201).json({ message: 'Signup successful', token: newStagiaire.token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/signin', (req, res) => {
  //const { email, password } = req.body;

  stagiaire.findOne({ email: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

router.delete('/delete', (req, res) => {
  stagiaire.findOneAndDelete({ email: req.params.email }).then(data => {
    if (data) {
      res.json({ result: true});
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});


//router.get('/', (req, res) => {
  //stagiaire.find().then((data)=> {res.json({data:data})})
//});
module.exports = router;







