const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register user
//@route Post /api/users/register
//Accept public
const registerUser =asyncHandler (async (req,res)=>{
   const {username,email,password} =req.body;
   if(!username || !email || !password){
    res.status(400);
    throw new Error("All fields are mandatory!")
   }
   const userAvaliable = await User.findOne({email});
   if(userAvaliable){
    res.status(400)
    throw new Error("User already registered!")
   }
   //Hash password section
   const hashedPassword = await bcrypt.hash(password,10);
   console.log("Hashed Password:",hashedPassword);
   const user = await User.create({
    username,
    email,
    password:hashedPassword
   });
   console.log(`User Created ${user}`);
   if(user){
    res.status(201).json({
        error:false,
        message:"Registration success",
        _id:user.id,
        // data:user,
        email:user.email,    
    })
   }else{
    res.status(400);
    throw new Error("User data is invalid!")
   }
    res.status(200).json({
        error:false,
        message:"Registration success",
        data:user
       
        }); 
   });
   //@desc Login user
//@route Post /api/users/login
//Accept public
const loginUser =asyncHandler (async (req,res)=>{
    return
   const {email,password}=req.body;
   if(!email || !password){
    res.status(400);
    throw new Error("All fields are mandatory!");

   };
   const user = await User.findOne({email});
   //compare passward with hasedpassword
   if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id: user.id
        }
    },process.env.ACCESS_TOKEN_SECRET, {expiresIn : "24h"});
    res.status(200).json({
        accessToken,
        data:user
    });
   }else{
    res.status(401);
    throw new Error("email or password is invalid");
   }
    // res.status(200).json({
    //     error:false,
    //     message:"Login success",
       
    //     }); 
   });
//@desc Current user
//@route Post /api/users/current
//Accept private
const currentUser =asyncHandler (async (req,res)=>{ 
    res.status(200).json({
        error:false,
        message:"Current user info",
        user:req.user 
        }); 
   });
   //Get All User Lists
   const getUsers =asyncHandler (async (req,res)=>{
    const users =await User.find();
    res.status(200).json({
        error:false,
        message:"contact detail",
        data:users
        }); 
   
   })
   module.exports = {registerUser,getUsers,loginUser,currentUser};