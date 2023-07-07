const mongoose =require("mongoose");
const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModle");

//@desc Create All Books
//@route Get /api/book/lists
const getBooks =asyncHandler (async (req,res)=>{
    const perPage = parseInt(req.query.perPage) || 10; 
    const currentPage = parseInt(req.query.page) || 1; 
    try {
    const totalCount = await Book.countDocuments({delete_status:1});
    const totalPages = Math.ceil(totalCount / perPage);
    const book =await Book.aggregate([
        {
            $lookup: {
              from: 'authors',
              localField: 'authorId',
              foreignField: '_id',
              as: 'authorData'
            }
          },
            
        {
          $project: {
            _id: 1,
            title:1,
            releaseYear:1,
            authorId: 1,
            authorName: { $arrayElemAt: ['$authorData.name', 0] }
           
          }
        }
      ])
    .skip((currentPage - 1) * perPage)
    .limit(perPage);
   
    res.status(200).json({
        error:false,
        message:"Book Lists",
        data:book,
        totalCount,
        currentPage,
        totalPages,  
        }); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
   })//End method


//@desc Create All Books
//@route Post /api/book/create
//Accept private
const createBook = asyncHandler( async (req,res)=>{
    //res.send("hello");
    //console.log("The request body is :", req.body);
    const {title,releaseYear,authorId} =req.body;
    if(!title || !releaseYear || !authorId) {
        res.status(400);
        throw new Error("All Fiels are mandotory");
    }
    const book = await Book.create({
        title,
        releaseYear,
        authorId
    })
    res.status(200).json({
        error:false,
        message:" create success",
        data:book
        }); 
   
   })


//@desc Get Detail All book
//@route Get /api/book/detail/id
//Accept private
const getBookDetail =asyncHandler (async (req,res)=>{
    const bookId = req.params.id;
    // console.log(bookId);
    // return;
    try {
      const bookDetails = await Book.aggregate([
        {
          $match: {
            _id:new mongoose.Types.ObjectId(bookId)
          }
        },
        {
          $lookup: {
            from: 'authors',
            localField: 'authorId',
            foreignField: '_id',
            as: 'author'
          }
        },
        {
          $unwind: '$author'
        },
        {
          $project: {
            _id: 1,
            title: 1,
            releaseYear:1,
            author: {
              _id: 1,
              name: 1
             
            }
          
          }
        }
      ]);
  
      if (!bookDetails || bookDetails.length === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
    //   return res.json(bookDetails[0]);
      res.status(200).json({
        error:false,
        message:"Book detail",
        data:bookDetails
        }); 
    } catch (err) {
      console.error('Failed to retrieve book details:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
   
   })// End Method
   
 //@desc Update All Book
//@route Put /api/book/update/id
//Accept private
const updateBook = asyncHandler(async(req,res)=>{
    const book = await Book.findById(req.params.id);
    // console.log(book);
    // return;
    if(!book){
        res.status(404);
        throw new Error("Book not found");
    }
    // if(book.authorId.toString() !== req.authorId){
    //     res.status(403);
    //     throw new Error("Book don't have permission to update!");
    // } 
    const updatedBook =await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json({
        error:false,
        message:"Book updated success",
        data:updatedBook
    }); 
   
   })
//@desc Delete All Book
//@route Delete /api/book/delete/id
//Accept private

const deleteBook = asyncHandler(async(req,res)=>{
    const book = await Book.findById({_id:req.params.id});
    // console.log(book);
    // return;
    if(!book){
        res.status(404);
        throw new Error("Book not found");
    }; 
   //user.remove();
   const data = await Book.findByIdAndUpdate(req.params.id,{delete_status:0})
    res.status(200).json({
        error:false,
        message:"User delete success",
        data:data
    }); 
   
   })//End Metho
  module.exports ={createBook ,getBookDetail,updateBook,deleteBook,getBooks};
