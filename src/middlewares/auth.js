const adminAuth=(req,res,next)=>{
    const Token="deepanshu";
    const Is_Authorized= Token==="deepanshu";
    console.log("Admin Auth is getting checked");
    {
        Is_Authorized ? (next()):(res.status(401).send("Premission Required!"));
    }
   
};

const userAuth=(req,res,next)=>{
    const Token="deepanshu";
    const Is_Authorized= Token==="deepanshu";
    console.log("UserAuth is getting checked");
    {
        Is_Authorized ? (next()):(res.status(401).send("Premission Required!"));
    }
   
};

module.exports={
    adminAuth,
    userAuth
}


   
