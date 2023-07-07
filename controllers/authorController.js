const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");
//const ObjectId = req


//@route Post /api/author/create
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
   
   })//End Method

//@route Get /api/author/lists
//Accept private
const getAuthorList =asyncHandler (async (req,res)=>{
    const perPage = parseInt(req.query.perPage) || 10; 
    const currentPage = parseInt(req.query.page) || 1; 
    // const searchKey = req.params.name; // Search key
//  Author.find({name:req.params.name},(error,result)=>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log(result);
//             return;
//         }
//     })
  
    try {
        // const findByName = function(authorName, done) {
        //     Author.find({"name":authorName},(err,data)=>{
        //     if(err) return done(err)
        //       return done(null,data)
        //       })  
            
        //     };
        // const query = {name:req.params.name};

        // if (searchKey) {
        //   query.key = { $regex: searchKey};
        // }

    const totalCount = await Author.countDocuments({delete_status:1});
    const totalPages = Math.ceil(totalCount / perPage);
    const author =await Author.find({ delete_status: 1 })
    .skip((currentPage - 1) * perPage)
    .limit(perPage);
   
    res.status(200).json({
        error:false,
        message:"Author Lists",
        data:author,
        totalCount,
        currentPage,
        totalPages,  
        }); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
   
   
   })//End method


//@route Get /api/author/id
//Accept private
const getAuthorDetail =asyncHandler (async (req,res)=>{
    const author = await Author.findById(req.params.id);
    if(!author){
        res.status(404);
        throw new Error("Author not found!")
    }
    res.status(200).json({
        error:false,
        message:"Author detail",
        data:author
        }); 
   
   })
 
  
//@route Put /api/author/update
//Accept private
const updateAuthor = asyncHandler(async(req,res)=>{
    const author = await Author.findById(req.params.id);
    // console.log(author);
    if(!author){
        res.status(404);
        throw new Error("Author not found");
    }
   
    const updatedAuthor=await Author.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json({
        error:false,
        message:"Author updated success",
        data:updatedAuthor
    }); 
   
   })
     //@desc Delete All contact
//@route Delete /api/contacts
//Accept private
const deleteAuthor = asyncHandler(async(req,res)=>{
    const author = await Author.findById(req.params.id);
    if(!author){
        res.status(404);
        throw new Error("Author not found");
    };
   //contact.remove();
//   await Author.deleteOne({_id: req.params.id});
   const data = await Author.findByIdAndUpdate(req.params.id,{delete_status:0})

    res.status(200).json({
        error:false,
        message:"Author delete success",
        data:data
    }); 
   
   })//End method

   
   
  module.exports ={createAuthor,getAuthorList,getAuthorDetail,updateAuthor,deleteAuthor};
