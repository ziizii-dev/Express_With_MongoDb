const mongoose =require("mongoose");
const userSchema =mongoose.Schema({
  
username:{
    type:String,
    required:[true,"Please add the name"],
},
email:{
    type:String,
    required:[true,"Please enter the email"],
    unique:[true,"Email address already exist!"]
},
password:{
    type:String,
    required:[true,"Please add the user password"],

},
photo:{
    type:String,
    default:null
},
authToken:{
    type:String,
    default:null
},
delete_status: {
    type: Number,
    default: 1
  }
},{
    timestamps:true,versionKey:false

});
module.exports = mongoose.model("User",userSchema);