const express=require("express");

const app=express();

 
// app.use("/hello/2" ,(req,res)=>{
//     res.send("Heelo ji I placed in Google");
//  });

//This will only call the use /test
app.use("/test" ,(req,res)=>{
   res.send("Heelo ji from server");
});
  
//This will only get the GET call to /user
app.get("/user",(req,res)=>{
     res.send({firstname:"Deepanshu",
        lastname:"Kohli"
     })
});


/// This will post the /user
app.post("/user",(req,res)=>{
    res.send("Data is successfully saved to data base");
});

//Making the delete CAll
app.delete("/user",(req,res)=>{
    res.send("Data of user deleted succesfully");
})

// app.use("/hello" ,(req,res)=>{
//     res.send("Heelo ji from Akshay Saini");
//  });
 
// app.use("/",(req,res)=>{
//     res.send("Namaste");
// }); 


app.listen(3000,()=>{
    console.log("Server is successfully listening the port 3000..")
});