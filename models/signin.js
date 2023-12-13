const mongoose = require ('mongoose');

const signinSchema = mongoose.Schema({
    email: String,
    password: String,
    token: String,
});
 const signin = mongoose.model('signin', signinSchema);

 module.exports = signin;