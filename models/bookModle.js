const mongoose =require("mongoose");
const bookSchema =mongoose.Schema({
  
title:{
    type:String,
    required:[true,"Please add the name"],
},
releaseYear:{
    type:String,
    required:[true,"Please enter the"],
},
authorId:{
    type: mongoose.Schema.Types.ObjectId,
    required:[true,"Please enter"],
    ref: 'Author'
  
},
delete_status: {
    type: Number,
    default: 1
  }
},{
    timestamps:true,versionKey:false

});
module.exports = mongoose.model("Book",bookSchema);