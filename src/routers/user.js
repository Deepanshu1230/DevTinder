const express=require("express");

const UserRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/ConnectionRequest");

const USER_SAFE="firstName lastName age gender skills"


UserRouter.get("/user/request/recieved",userAuth, async (req,res)=>{


    try{

    const loggedIn=req.UserInfo;

    const connectionRequest=await ConnectionRequest.find({
        ToUserId:loggedIn._id,
        status:"interested"
    }).populate("fromUserId","firstName lastName age gender skills photoUrl");
    // .populate("fromUserId",["firstName","lastName"]);


     if(!connectionRequest){
        return res.status(400).json({
            message :`Unable to See Connectioi`
        })
     }

     res.json({
        message:`Connection Are here`,
        data:connectionRequest
     })

    }
    catch(err){

        res.status(400).send("ERROR" + err.message);

    }


    

});

UserRouter.get("/user/connection",userAuth, async (req,res)=>{

    try{

        const loggedIn=req.UserInfo;

    const connectionRequest=await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedIn._id,
                status:"accepted"},
                {ToUserId:loggedIn._id,
                    status:"accepted"
                }
        ],
        
    }).populate("fromUserId", USER_SAFE).populate("ToUserId",USER_SAFE);

    if(!connectionRequest){
        return res.status(400).json({
            message:`No reply Found`
        })
    }
     

    const data=connectionRequest.map((row) =>{

        if(row.fromUserId._id.toString() === loggedIn._id.toString()){
            return row.ToUserId;
        }
        return row.fromUserId;

    });

    res.json({
        message:`Connnection are Here`,
        data
    })
    

    }
    catch(err){

       res.status(400).send("ERROR:" +err.message);

    }
    
});









module.exports=UserRouter;