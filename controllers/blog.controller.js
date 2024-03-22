const { BlogModel } = require('../models/blog.model');
const errorHandler = require('../errors/errorHandler');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./database/uploads"); // Destination folder for storing uploaded files
  },
  filename: (req, file, callback) => {
    const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
    callback(null, filename); // Setting the filename for the uploaded file
  }
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Function to add a new blog
const addBlog = async (req, res, next) => {
  try {
    const { title, introduction,description, author } = req.body;

    let image = req.file ? req.file.filename : "";

    let existBlog = await BlogModel.findOne({ title: title, author: author });

    if (existBlog) {
      return next(errorHandler(409, "This blog already exists and it can't be added twice"));
    } else {
      
      const addedBlog = await BlogModel.create({
        title: title,
        introduction: introduction,
        description: description,
        author: author,
        image: image,
        comments: [],
        likes: 0
      });

      res.status(201).json({
        message: "Your blog was added successfully!",
        blog: addedBlog
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//function to add a comment to the blog
const addComment = async(req,res,next)=>{
  try{
    const {comment} = req.body;
    console.log(comment);
    const blogId = req.params.id;
    console.log(blogId);
    const blog = await BlogModel.findById(blogId);
    console.log(blog);

    if(!blog){
      return res.status(404).json({message: "Blog not found"});
    }

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json({
      message: "Your comment was added successfully!",
      blog: blog
    });

  }catch(e){
      console.log(e);
  }
}
//function to like a blog




const listBlog = async (req, res, next) => {
  try{
    var allblogs = await BlogModel.find({});
    res.status(200).json({
      allblogs
    });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}
const findById = async (req, res, next) => {

  try {
    let blogId = req.params.id;
    var foundblog = await BlogModel.findById(blogId);
    if(foundblog === null){
      return res.status(404).json({message:"blog not found"})
    } 
    res.status(200).json({
      blog: foundblog
  });
} catch (error) {
  console.log(error);
  res.status(500).send(error);
}
  }
  
  const deleteBlog = async (req, res, next) =>{
    try{
      var deletedblog = await BlogModel.findByIdAndDelete(req.params.id);
      if (deletedblog) {
        res.status(200).json({ message: "The blog was Deleted...." });
      } else {
        res.status(400).json({message: "blog not found!"});
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  const updateBlog = async (req, res, next) => {
    try {
      
      const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.status(200).json({
        message: "Your blog was updated successfully",
        blog
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the blog" });
    }
   
};


module.exports = {
  findById, 
  listBlog, 
  deleteBlog,
  recordBlog: addBlog, 
  updateBlog,
  addComment
}