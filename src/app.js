const express=require("express");
const connectDb=require("./config/dataBase");
const app=express();
const bcrypt=require("bcrypt");
const User=require("./models/user");
const Validator=require("./utils/validator");
const validator=require("validator");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());



app.post("/signup",async (req,res)=>{

    // console.log(req.body);
    //This is the instance of the user model
    

    try{

        // if(UserInfo?.skills.length >5){
        //     throw new Error("Skills Size Exceeded");

        // }

        //validation of Data
        Validator(req);

         const {firstName,lastName,emailId,password}=req.body;
        //Encrypting the Password
        const passwordhash=await bcrypt.hash(password,10);
        console.log(passwordhash);








        const UserInfo=new User({
            firstName,
            lastName,
            emailId,
            password:passwordhash,
        });
        await UserInfo.save();

        res.send("User Succesfully Sent the data");

    }
    catch(err){
        // if (err.code === 11000) {
        //     return res.status(400).json({ error: "Email already exists" });
        // }
        res.status(400).send("Error handling :" + err.message);

    }

    
})


app.post("/login", async (req,res)=>{



    try{
        const {emailId,password}=req.body;

        // if(!validator.isEmail(emailId)){
        //     throw new Error("Enter valid emailId");
    
        // }
    
    
        const user=await User.findOne({emailId:emailId});
    
        
        if(!user){
            throw new Error("Invalid Credentials");
        }
    
        const IsvalidPassword=await user.ValidatePassword(password);
       

        if(IsvalidPassword){
            //Create JWT Token
            const token=await user.getJWT();
            console.log(token);

            //Add the Token to the Cookie and sent back to user
            res.cookie("token",token);




            res.send("Login succesfully");
    
        }
        else{
            throw new Error("Invalid Credentials");
        }

    }
    catch(err){
        
           
            res.status(400).send("Error handling :" + err.message);
    
        
    

    }
   





})

app.get("/profile",userAuth,async (req,res)=>{


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

    
})

app.post("/sentConnectionRequest",userAuth,(req,res)=>{

    const user=req.UserInfo;
    console.log("REquest sent ");

    res.send(user.firstName +" sent Connection Request Sent...")
})



//Getting the EmailId
// app.get("/user", async (req,res)=>{
//     const userEmail=req.body.emailId;
    
//     try{
//        const user=await User.findOne({emailId:userEmail});
//        if(!user ||  user.length === 0){
//         res.status(404).send("Unable to find the Data")
//        }
//        else{
//         res.send(user);

//        }
       
//     }
//     catch(err){
//         res.status(401).send("Facig Some Error:",err);

//     }
   

// });

//FEED-all the  user will be get by API from database
// app.get("/feed", async (req,res)=>{
//     try{
//       const user=await User.find({});
//       if(user.length ===0){
//         res.status(404).send("Unable to find the Data")
//        }
//        else{
//         res.send(user);

//        }
       
//     }
//     catch(err){
//         res.status(401).send("Facig Some Error:",err);

//     }
    
// });


//Deleting using the findidnaddelete
// app.delete("/user", async (req,res)=>{
//     const UserId=req.body.UserId;

//     try{
//         // await User.findByIdAndDelete({_id:UserId});
//         await User.findByIdAndDelete(UserId);
//         if(!UserId){
//             res.status(401).send("Send Coreect user Id")
//         }
//         else{
//             res.send("Data Deleted Successfully");

//         }
        

//     }
//     catch(err){
//         res.status(401).send("Unable to see the data",err.message);

//     }
// })

//Updating the existing User
// app.patch("/user/:userId", async (req,res)=>{
    
// try{

//     const userId=req.params?.userId;
//      const data=req.body;

//     const ALLOWED_DATA=[
//         "about",
//         "photoUrl",
//         "skills",
        
//     ];

//     const IS_allowed= Object.keys(data).every((k)=>
//         ALLOWED_DATA.includes(k)
//     )

//     if(!IS_allowed){
//         throw new Error("Cannot update not allowed");

//     }

//    const output = await User.findByIdAndUpdate(userId,data,
//     {returnDocument:"before",
//         runValidators:true,
//     }
    
// );
//    console.log(output);

//    res.send("Data Updated Succesfully");

// }
// catch(err){
//     res.status(401).send("Enable to update the User"+ err.message);
// }

// });


connectDb().then(()=>{
    console.log("Database Connection established...");
    app.listen(3000,()=>{
    console.log("Server is successfully listening the port 3000..")
});
}).catch((err)=>{
    console.log("Database Cannot be connected...");
});












































// app.use("/user",(req,res)=>{
    // try{
        // throw new error("Error Found");
        // res.send("User data Sent");

    // }
    // catch(err){
    //     res.status(500).send("Something went Wrong Try again");

    // }   
// });

// app.use("/",(err,req,res,next)=>{
//     if(err){
        //log your Error
//         res.status(500).send("Something Went Wrong");
//     }
// });

/////////// ----MiddleWare-Auth-Creating-------   //////////
// const { adminAuth, userAuth }=require("./middlewares/auth");

// app.use("/admin",adminAuth);


// app.get("/user",userAuth,(req,res)=>{
//     res.send("User Data Sent");
// });

// app.get("/user/login",(req,res)=>{
//     res.send("User login Sent");
// });

// app.use("/admin/deletedata",(req,res)=>{
//     res.send("Deleted User Data");
// });


// app.get("/admin/data",(req,res)=>{

    //we need to check if the data is Authorized or not
   
   
    //no 2 data can be defined in single request handler
    // res.send("This is the Admins Data");

// });

////////////***************************************** */////////////////


////////////------Request route Handler-------///////////

//IT Get the /users => Check app.xxx from line by line
//We can also make separate
// app.use("/",(req,res,next)=>{
//     // res.send("This is the World");
//     next();
// })
// app.get("/user",(req,res,next)=>{
//     // res.send("2nd Route Handler");
//     next()
// });
// app.get("/user",(req,res,next)=>{
//     console.log("Route handle 1");
//     // res.send("Route 3");
//     next();
// },
//  (req,res,next)=>{
//     res.send("Route 4");
//  }
// );

/////////************************************////////


/////////--------Route Handling------/////////
//This is the one way of creating the route handler

// app.get("/user",[(req,res,next)=>{
//     console.log("Route 1 handling");
//     // res.send("Route Handler 1");
//     next();
// }],
// (req,res,next)=>{
//     res.send("Route 2");
// });

///////*************************************///////

//////////----------Multiple route handler------------////////
// app.use("/user",[(req,res,next)=>{
//     console.log("Route Handler1");
//     // res.send("Route handler 1");
//     next();
    
// }, 
// (req,res,next)=>{
//     console.log("Route 2");
//     // res.send("Route Hanlder 2");
//     next();
// },

// (req,res,next)=>{
//     console.log("Route 3");
//     // res.send("Route Hanlder 3");
//     next();
// },

// (req,res,next)=>{
//     console.log("Route 4");
//     res.send("Route Hanlder 4");
// }
// ]);

//////****************************///////////


//Here ac and abc will work
// app.get("/user/:userid/:Password/:name",(req,res)=>{
//     console.log(req.params);
//     res.send({firstname:"lucky",
//         lastname:"Yadav"
//     })
// })

//This is regex if you write like {car ,aihd,ajkbk} a should be included
// app.get(/a/,(req,res)=>{
//     res.send({firstname:"lucky",
//         lastname:"Yadav"
//     })
// })


// app.use("/hello/2" ,(req,res)=>{
//     res.send("Heelo ji I placed in Google");
//  });

//This will only call the use /test
// app.use("/test" ,(req,res)=>{
//    res.send("Heelo ji from server");
// });
  
//This will only get the GET call to /user
// app.get("/user",(req,res)=>{
//      res.send({firstname:"Deepanshu",
//         lastname:"Kohli"
//      })
// });


/// This will post the /user
// app.post("/user",(req,res)=>{
//     res.send("Data is successfully saved to data base");
// });

//Making the delete CAll
// app.delete("/user",(req,res)=>{
//     res.send("Data of user deleted succesfully");
// })

// app.use("/hello" ,(req,res)=>{
//     res.send("Heelo ji from Akshay Saini");
//  });
 
// app.use("/",(req,res)=>{
//     res.send("Namaste");
// }); 


