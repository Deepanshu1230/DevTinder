const express=require("express");

const app=express();

app.get("/",(req,res)=>{
    res.send("Namaste");
});

app.get("/test" ,(req,res)=>{
   res.send("Heelo ji from server");
});

app.get("/hello" ,(req,res)=>{
    res.send("Heelo ji from Akshay Saini");
 });

app.listen(3000,()=>{
    console.log("Server is successfully listening the port 3000..")
});