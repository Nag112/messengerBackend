const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const app = express();

const cors = require('cors');

const UserRoute = require('./routes/userRoute');

const MessageRoute = require('./routes/messagesRoute');

const { authenticateReq, dbConnect } = require('./utils');
const { response } = require('express');

global.__basedir = __dirname;

var handlers = [cors(),express.json()]
//,authenticateReq
app.use(handlers);

dotenv.config();

app.get('/', (req, res) => {
  res.send("Hello there");
});

app.use('/user', UserRoute);

app.use('/messages', MessageRoute);

app.get('/help',(req,res)=>{
  
var dbtwo = {
    "one":"data",
    "two":dbth,
    "four":dbfo
    };
    var dbone = {
        "data":"datr",
        "two":dbtwo
    }
    res.json(dbone);
});

const port = process.env.listen || 5001;

app.listen(port,dbConnect);
