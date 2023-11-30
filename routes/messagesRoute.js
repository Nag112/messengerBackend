var express = require("express");
const { addNewMessage,editMessage,deleteMessage,getMessages } = require("../controllers/messegesController");
var router = express.Router();
const UserController = require('../controllers/usersController');
router.get('/',UserController.validateUser,(req,res)=>{

getMessages(req.isAdmin,req.userId).then((resp)=>{
    res.statusCode = 200;
    res.json({ success: true, message: "fetched successfully",data:resp });
}).catch(err=>{
    console.log(err.message);
    res.statusCode = 202;
    res.json({ success: false,data:[], message: "Messages fetching failed, Please try again using different mobile number" });
});
});
router.post('/',UserController.validateUser,(req,res)=>{
    if(req.isAdmin)
    {
        if(req.body.users.length>0)
        {
            addNewMessage(req.body).then((resp)=>{
                res.statusCode = 200;
                res.json({ success: true, message: "Message scheduled" });
            }).catch(err=>{
                console.log(err.message);
                res.statusCode = 202;
                res.json({ success: false,data:[], message: "Message scheduled failed, Please try again using different mobile number" });
            });
        }
        else{
            res.statusCode = 201;
            res.json({ success: false, data:[],message: "Please select atleast one user" });
        }
        
    }
    else
    {
        res.statusCode = 405;
        res.send({"status":false,data:[],message:"Un authorized"});
    }
});
router.post('/edit/:id',UserController.validateUser,(req,res)=>{
    if(req.isAdmin)
    {
        editMessage(req.body,req.params.id).then((resp)=>{
            res.statusCode = 200;
            res.json({ success: true, data:[],message: "Message edited successfully" });
        }).catch(err=>{
            console.log(err.message);
            res.statusCode = 202;
            res.json({ success: false,data:[], message: "Message editing failed, Please try again using different mobile number" });
        });
    }
    else
    {
        res.statusCode = 405;
        res.send({"status":false,data:[],message:"Unauthorized"});
    }
})
router.post('/delete/:id',UserController.validateUser,(req,res)=>{
    if(req.isAdmin)
    {
        deleteMessage(req.params.id).then((resp)=>{
            res.statusCode = 200;
            res.json({ success: true, message: "Message deleted successfully" });
        }).catch(err=>{
            console.log(err.message);
            res.statusCode = 202;
            res.json({ success: false, message: "Message deletion failed, Please try again using different mobile number" });
        });
    }
    else
    {
        res.statusCode = 405;
        res.send({"status":false,message:"Unauthorized"});
        console.log("hello hi");
    }
})
module.exports = router;