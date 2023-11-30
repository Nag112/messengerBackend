var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function authenticateReq(req,res,next)
{
        if(req.headers['x-key']){
          if(req.headers['x-key'] == process.env.APP_KEY || req.headers['x-key'] == process.env.WEB_KEY || req.headers['x-key'] == process.env.TEST_KEY){
            next();
          }
          else
          {
            res.status(401).send({message: 'Invalid API Key', data: null});}
        }
        else 
          res.status(401).send({message: 'Key not found', data: null}); 
}

function dbConnect()
{
    mongoose.connect(process.env.MONGO_DATABASE_URI, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true }).then(() => console.log("Connection successfull")).catch((err) => console.log("Error connection to DB"));
}

module.exports = {authenticateReq,dbConnect};