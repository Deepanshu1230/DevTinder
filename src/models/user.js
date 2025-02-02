
const mongoose=require("mongoose");

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
            if( !value.includes("@gmail.com") || !value.endsWith("@gmail.com")){
                throw new Error();
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
        default:"https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg"
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
