var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    deviceToken:String,
    name:String,
    mobile:{type:String,unique:true},
    password:String,
    isAdmin:{type:Boolean,default:false},
    verified:{type:Boolean,default:false}
});

module.exports = mongoose.model('Users',usersSchema);