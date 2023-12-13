const mongoose=require('mongoose');
const connectionString='mongodb+srv://carineflavie13:krine1210@cluster0.obfjbcz.mongodb.net/StageFinder';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));