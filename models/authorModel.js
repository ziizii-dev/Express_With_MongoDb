const mongoose =require("mongoose");
const authorSchema =mongoose.Schema({
  
name:{
    type:String,
    required:[true,"Please add the name"],
},
delete_status: {
    type: Number,
    default: 1
  }


},{
    timestamps:true,versionKey:false

});
module.exports = mongoose.model("Author",authorSchema);