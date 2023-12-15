var express = require('express');
var router = express.Router();



router.get('/filter',(req,res)=>{
  const apiKey = process.env.NEWS_API_KEY;

 fetch(`https://api.coresignal.com/cdapi/v1/linkedin/job/search/filter?${apiKey}`)
    .then(response => response.json())
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      console.error('Erreur lors de la requête :', error);
      res.status(500).json({ error: 'Erreur lors de la requête' });
    });
});

module.exports = router;

  

