const Messages = require("../models/messagesModel");
var admin = require("firebase-admin");
var serviceAccount = require('../firebase.json');
const schedule = require('node-schedule');
const userModel = require("../models/userModel");
const UserController = require('../controllers/usersController');

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
});
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
function addNewMessage(data)
{
        scheduleMessage(data);
        return Messages.create(data);
   
}
function editMessage(data,id)
{
    return Messages.findByIdAndUpdate(id,data);
}
function deleteMessage(id)
{
    return Messages.findOneAndDelete({'_id':id});
}
function getMessages(isAdmin,userId)
{
    let constraint = {};
if(!isAdmin)
{
    constraint = {"users":userId,"time":{$lte:new Date().getTime()}};
}
    return Messages.find(constraint);
}
function scheduleMessage(messageData)
{
    UserController.getUserTokens(messageData.users).then((resp)=>{
        var tokens = resp.map(ele=>ele.deviceToken);
        schedule.scheduleJob(messageData.time, ()=>{
            sendNotification(tokens,messageData.message);
    });
    console.log("sending notifications");
    });
 return true;
}
function sendMessage()
{
    return true;
}
function sendNotification(token,message)
{
    const options =  notification_options
    var content = {
        notification: {
           title: "Message from Admin",
           body: message
               }
        };
    admin.messaging().sendToDevice(token, content, options)
    .then( response => {
        console.log(response);
    })
    .catch( error => {
        console.log(error);
    });
}

module.exports = {addNewMessage,editMessage,deleteMessage,getMessages};