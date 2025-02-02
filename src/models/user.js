
const mongoose=require("mongoose");

const UserSchema= new  mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        
        
    },
    lastName:{
        type:String

        
    },
    emailId:{
        type:String,
        required:true,
        unique: true ,
        lowercase:true,
        trim:true,
        
    },
    age:{
        type:Number,
        min:18,
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
        default:"https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg"
    },
    about:{
        type:String,
        default:"This is the default description of the user",
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true,
})


module.exports = mongoose.model("User",UserSchema);
