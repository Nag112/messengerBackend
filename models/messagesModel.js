var mongoose = require('mongoose');

var messagesSchema = new mongoose.Schema({
   time:Number,
   message:String,
   users:{type:[ mongoose.Schema.Types.ObjectId], ref: "Users" },
},{timestamps:true});

module.exports = mongoose.model('Messages',messagesSchema);