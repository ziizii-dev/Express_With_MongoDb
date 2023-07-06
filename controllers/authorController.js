const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");
//const ObjectId = req

//@desc Create All contact
//@route Post /api/contacts
//Accept private
const createAuthor = asyncHandler( async (req,res)=>{
    //res.send("hello");
    //console.log("The request body is :", req.body);
    const {name} =req.body;
    if(!name) {
        res.status(400);
        throw new Error("All Fiels are mandotory");
    }
    const author = await Author.create({
        name,
    })
    res.status(200).json({
        error:false,
        message:" create success",
        data:author
        }); 
   
   })
//@desc Get All contact
//@route Get /api/contacts
//Accept private
const getContacts =asyncHandler (async (req,res)=>{
    const contacts =await Contact.find({user_id: req.user.id});
    res.status(200).json({
        error:false,
        message:"contact detail",
        data:contacts
        }); 
   
   })

//@desc Get Detail All contact
//@route Get /api/contacts/id
//Accept private
const getContactDetail =asyncHandler (async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!")
    }
    res.status(200).json({
        error:false,
        message:"contact detail",
        data:contact
        }); 
   
   })
   //@desc Get  All contacts
//@route Get /api/contacts
//Accept private
const Contacts =asyncHandler (async (req,res)=>{
    res.status(200).json({
        error:false,
        message:"contact list",
        data:Contacts
    }); 
   
   })
     //@desc Update All contact
//@route Put /api/contacts
//Accept private
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    } 
    const updatedContact =await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json({
        error:false,
        message:"contact updated success",
        data:updatedContact
    }); 
   
   })
     //@desc Delete All contact
//@route Delete /api/contacts
//Accept private
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById({_id:req.params.id});
    //console.log(contact);
    //return;
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    };
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts");

    } 
   //contact.remove();
  await Contact.deleteOne({_id: req.params.id});

    res.status(200).json({
        error:false,
        message:"contact delete success",
        data:contact
    }); 
   
   })
  module.exports ={createAuthor };
