const express=require("express");

const app=express();
const { adminAuth, userAuth }=require("./middlewares/auth");

app.use("/admin",adminAuth);


app.get("/user",userAuth,(req,res)=>{
    res.send("User Data Sent");
});

app.get("/user/login",(req,res)=>{
    res.send("User login Sent");
});

app.use("/admin/deletedata",(req,res)=>{
    res.send("Deleted User Data");
});


app.get("/admin/data",(req,res)=>{

    //we need to check if the data is Authorized or not
   
   
    //no 2 data can be defined in single request handler
    res.send("This is the Admins Data");

});

























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














//This is the one way of creating the route handler

// app.get("/user",[(req,res,next)=>{
//     console.log("Route 1 handling");
//     // res.send("Route Handler 1");
//     next();
// }],
// (req,res,next)=>{
//     res.send("Route 2");
// });

















///Multiple route handler
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


app.listen(3000,()=>{
    console.log("Server is successfully listening the port 3000..")
});