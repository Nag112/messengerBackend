var express = require("express");
var router = express.Router();
const UserController = require('../controllers/usersController');

router.get('/',UserController.validateUser,(req,res)=>{
UserController.getAllUsers().then((resp)=>{
    if(resp)
    {
        res.statusCode = 200;
        res.json({ success: true, message: "fetch Successful",data:resp});
    }
    else{
        res.statusCode = 204;
        res.json({ success: false, message: "fetch failed" });
    }
}).catch(err=>{
    res.statusCode = 500;
    console.log(err.message);
    res.json({ success: false, message: err.message });
})
});
router.post('/login',(req,res)=>{
    UserController.verifyUser(req.body).then((resp)=>{
        if(resp)
        {
            res.statusCode = 200;
            res.json({ success: true, message: "Login Successful",data:resp,token:UserController.genToken(resp)});
        }
        else{
            res.statusCode = 201;
            res.json({ success: false, message: "Incorrect mobile/password" });
        }
    }).catch(err=>{
        res.statusCode = 500;
        console.log(err.message);
        res.json({ success: false, message: err.message });
    })
});

router.post('/register',(req,res)=>{
    UserController.addUser(req.body,res).then((resp)=>{
        res.statusCode = 200;
        res.json({ success: true, message: "registration success" });
    }).catch(err=>{
        res.statusCode = 202;
        res.json({ success: false, message: "Mobile number already exists, Please try again using different mobile number" });
    });
})
router.post('/verify',(req,res)=>{
    UserController.updateVerifyStatus(req.body).then((resp)=>{
        res.statusCode = 200;
        res.json({ success: true, message: "verified successfully" });
    }).catch(err=>{
        res.statusCode = 201;
        res.json({ success: false, message: "verification failed, Please try again later" });
    });
})

router.post('/password',(req,res)=>{
    UserController.updatePassword(req.body).then((resp)=>{
        res.statusCode = 200;
        res.json({ success: true, message: "Password updated successfully" });
    }).catch(err=>{
        res.statusCode = 201;
        res.json({ success: false, message: "Password update failed, Please try again later" });
    });
})

module.exports = router;