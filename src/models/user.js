
const mongoose=require("mongoose");
const validator=require("validator");
const UserSchema= new  mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:"3",
        maxlength:"15"
        
        
    },
    lastName:{
        type:String,
        minlength:"3",
        maxlength:"15"

        
    },
    emailId:{
        type:String,
        required:true,
        unique: true ,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email Address:"+value);
            }

    }
        
        
    },

    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter strong password:"+value);
            }
        }
    },

    age:{
        type:Number,
        min:18,
        minlength:"2",
        maxlength:"2"
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data not found");
            }
        }
    },
    photoUrl:{
        type:String,
        // default:"https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg"
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL:"+value);
            }
        }
    },
    about:{
        type:String,
        default:"This is the default description of the user",
    },
    skills:{
        type:[String],
        validate(value){
            if(value.length >5){
                throw new Error("Minimize the Limit");
            }
            else{
                return value;

            }

        }
    }
},{
    timestamps:true,
})


module.exports = mongoose.model("User",UserSchema);
