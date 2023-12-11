const mongoose=require('mongoose');
const connectionString='mongodb+srv://carineflavie13:krine1210@cluster0.obfjbcz.mongodb.net/recruteur';

mongoose.connect(connectionString,{connectionOutMS:2000})
.catch(error=>console.error(error));