const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
//const ObjectId = req


  
//@desc Update All user
//@route Put /api/user/update/id
//@need Bare Token
//Accept private
const updateUserInfo = asyncHandler(async(req,res)=>{
   
//  const id = req.params.id;

   const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    const updatedUserInfo =await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json({
        error:false,
        message:"User updated success",
        data:updatedUserInfo
    }); 
   
   })//End Method

//@desc Delete All Author
//@route Delete /api/author/delete/id
//Accept private
const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById({_id:req.params.id});
    //console.log(contact);
    //return;
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }; 
   //user.remove();
   const data = await User.findByIdAndUpdate(req.params.id,{delete_status:0})
    res.status(200).json({
        error:false,
        message:"User delete success",
        data:data
    }); 
   
   })//End Method

   //Password Change Section
   //@route Put /api/user/password/change/
   const userPasswordChange = asyncHandler(async(req,res)=>{
    const {authToken, currentPassword, newPassword, confirmPassword } = req.body;
    try {
        const user = await User.findOne({authToken});
        // console.log(user);
        // return;

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
       
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Incorrect current password' });
        }
        if (newPassword !== confirmPassword) {
          return res.status(400).json({ message: 'New password and confirm password do not match' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();
    
        return res.json({ message: 'Password changed successfully' });
      } catch (err) {
        console.error('Failed to change password:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
   
   })//End Method
  module.exports ={updateUserInfo,deleteUser,userPasswordChange};
