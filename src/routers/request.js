const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequestUser=require("../models/ConnectionRequest");

const User=require("../models/user");


requestRouter.post("/request/send/:status/:TouserId",userAuth,async (req,res)=>{

    try{
        const fromUserId=req.UserInfo._id;
       

  const ToUserId=req.params.TouserId;

  const status=req.params.status;


  //adding the security and  some sort of validation
  const IsValid=["ignored","interested"];
  if(!IsValid.includes(status)){
    return res.status(400).json({
        message:`Invalid request `+ status
    })
  }
  const connectionRequest=new ConnectionRequestUser({
    fromUserId,
    ToUserId,
    status
  });

  //I need to validate that if they already exist
  const existingConnectionRequest=await ConnectionRequestUser.findOne({ 
    $or:[
      {fromUserId,ToUserId},
      {fromUserId:ToUserId,ToUserId:fromUserId}
    ]
  }); 
  if(existingConnectionRequest){
    return res.status(400).json({
      message:`Connection Request Already Exist`
    })
  }

  const toUser=await User.findById(ToUserId);
  if(!toUser){
    return res.status(400).json({
      message:`User not Found`
    })
  }

  

  const data=await connectionRequest.save();

    res.json({
        message:req.UserInfo.firstName + status + toUser.firstName,
        data,

    });


    }
    catch(err){

        res.status(400).send("ERROR:" +err.message);

    }

  
});

module.exports=requestRouter;