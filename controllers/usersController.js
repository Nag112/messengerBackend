const md5 = require("md5");
var jwt = require('jsonwebtoken');
const UserModel = require("../models/userModel");
const dotenv = require('dotenv');

dotenv.config();

function addUser(data)
{
    data.password = md5(data.password);
   return UserModel.create(data);
}

function verifyUser(data)
{
    data.password = md5(data.password);
    return UserModel.findOne(data).select('isAdmin name mobile verified');
}
function updateVerifyStatus(data)
{
    return UserModel.updateOne(data,{"verified":true});
}
function getAllUsers()
{
    return UserModel.find().select('name mobile');
}
function getUserTokens(users)
{
    return UserModel.find({"_id":{$in:users}}).lean().select('deviceToken -_id');
}
function validateUser(req,res,next){
    if(req.headers.AuthToken||req.headers.authtoken)
    {
        try{
          var decoded = jwt.verify(req.headers.AuthToken||req.headers.authtoken,process.env.SECRET)
                req.userId = decoded.userId;
                req.isAdmin = decoded.isAdmin;
                next();
        }   
    catch(err){
        
            res.status(403).send({success:false,message: err.message, data: null});
        }
    }
    else{
        res.status(401).send({success:false,message: 'Token not found', data: null});
    }
}
function updatePassword(data)
{
    UserModel.findOneAndUpdate({"mobile":data.mobile},{"password":md5(data.password)});
}
function genToken(user)
{
    return jwt.sign({ userId:user._id,isAdmin:user.isAdmin}, process.env.SECRET);
}

module.exports = {validateUser,verifyUser,addUser,genToken,updateVerifyStatus,updatePassword,getUserTokens,getAllUsers};