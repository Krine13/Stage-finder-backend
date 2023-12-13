var express = require('express');
var router = express.Router();
require('../models/connection');
const evenement = require('../models/evenement');


router.post('/evenement', async (req, res) => {
    try {
      const { date, nom, inscription, presentation, image} = req.body;
  
      // Vérification de l'existence de l'événement
      const existingEvenement = await evenement.findOne({ date, nom });
      if (existingEvenement) {
        return res.status(400).json({ message: 'Evenement already exists' });
      }
      // creation de l'événement
      const newEvenement = new evenement({
        date,
        nom,
        inscription,
        presentation,
        image,
        
      });
      // sauvegarde et envoie sur la DB de l'événement. 
      await newEvenement.save();

      res.status(201).json({ message: 'Evenement post successful'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// router de suppression d'événement passé ou annuler .
router.delete('/delete', (req, res) => {
   evenement.findOneAndDelete({ nom: req.params.nom }).then(data => {
      if (data) {
        res.json({ result: true});
      } else {
        res.json({ result: false, error: 'Evenement not found' });
      }
    });
  });

module.exports = router;