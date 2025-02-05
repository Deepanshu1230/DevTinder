const express=require("express");
const {userAuth}=require("../middlewares/auth");

const requestRouter=express.Router();


requestRouter.post("/sentConnectionRequest",userAuth,(req,res)=>{

    const user=req.UserInfo;
    console.log("REquest sent ");

    res.send(user.firstName +" sent Connection Request Sent...")
});

module.exports=requestRouter;