const express=require("express");
const {userAuth}=require("../middlewares/auth");

const { ValidateProfileEdit } =require("../utils/validator");

const profileRouter=express.Router();


profileRouter.get("/profile/view",userAuth,async (req,res)=>{


    try{
       
        const user=req.UserInfo;


    // const decodedValue=await jwt.verify(token,"DevTinder@123");

    // console.log(decodedValue);
    
    // const {_id}=decodedValue;
    
    // console.log("LoggedIn User Info:"+_id);

    // const ProfileUser=await User.findById(_id);
    
    // if(!ProfileUser){
    //     throw new Error("User Doesnot Exist");
    // }

    res.send(user);


    
}
    catch(err){

        res.status(400).send("Error handling :" + err.message);

    }

    
});

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{

    try{
        ValidateProfileEdit(req);

        const loggedIndata=req.UserInfo;
        
        
        const updateData=req.body;

        Object.keys(updateData).forEach((k)=> loggedIndata[k]=updateData[k]);

       await loggedIndata.save();

       res.json( { 
        message:`${loggedIndata.firstName}, Profile is Updated Succesfully`,
        Data:loggedIndata
    
    }
       
       )

    }
    catch(err){

        res.status(400).send("ERROR: " + err.message);

    }



    


    







});


module.exports=profileRouter;

