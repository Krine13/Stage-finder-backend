const mongoose=require('mongoose')


const portfolioSchema=mongoose.Schema({

    url:String,
    candidat:[{ type: mongoose.Schema.Types.ObjectId, ref: 'portfolio' }],
    
    });
    






    const portfolio=mongoose.model('portfolio',portfolioSchema);
    module.exports=portfolio;   