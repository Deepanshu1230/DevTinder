const validator=require("validator");

const ValidatorSignup=(req)=>{
    const {emailId,password,firstName,lastName,age,skills}=req.body;

    if(!validator.isEmail(emailId)){
        throw new Error("Enter the Valid email ID");
    }
    else if(!firstName || !lastName ){
        throw new Error("Write Valid Names");

    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter the Tough Password");
    }
};

module.exports=ValidatorSignup;