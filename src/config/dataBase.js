const mongoose=require("mongoose");


const connectDb=async ()=>{

   await mongoose.connect("mongodb+srv://deepanshukohli042:PSbjkGNCHybVKAA9@lumeberjack.h1m50.mongodb.net/devTinder");

};

module.exports=connectDb;


