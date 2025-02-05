const jwt=require("jsonwebtoken");
const User=require("../models/user");


const userAuth= async (req,res,next)=>{

    try{

        const cookies=req.cookies;

       const { token }=cookies;

       const decodedData=await jwt.verify(token,"DevTinder@123");
       const {_id}=decodedData;
       if(!decodedData){
         throw new Error("Invalid Token");
       };

       const UserInfo=await User.findById({_id});
       if(!UserInfo){
        throw new Error("Invalid User");

       };

       req.UserInfo=UserInfo;

       next();


    }
    catch(err){

        res.status(404).send("ERROR OCCURED:" + err.message);

    }
       




       
   
};


module.exports={
 
    userAuth,
}


   
