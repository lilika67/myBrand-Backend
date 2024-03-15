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
    // Extracting data from request body
    const { title, description, author } = req.body;

    // Check if image file is uploaded
    let image = req.file ? req.file.filename : ""; // If image is uploaded, set image filename, otherwise empty string

    // Check if blog with same title and author already exists
    let existBlog = await BlogModel.findOne({ title: title, author: author });

    if (existBlog) {
      return next(errorHandler(409, "This blog already exists and it can't be added twice"));
    } else {
      // Create a new blog document in the database
      const addedBlog = await BlogModel.create({
        title: title,
        description: description,
        author: author,
        image: image // Set the image filename for the blog
      });

      // Send response to the client
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



const listBlog = async (req, res, next) => {
  try{
    var allblogs = await BlogModel.find({});
    res.status(200).json({
      users: allblogs
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
        console.log(req.body, req.params.id);
        const blogz = await BlogModel.findById(req.params.id)
        console.log(blogz);
        
        var updatedblog = await BlogModel.findByIdAndUpdate({_id:req.params.id},req.body);
        if(updatedblog === null){
          return res.status(404).json({message:"blog not found"})
        }
        var blog = await BlogModel.find(updatedblog._id);
        res.status(200).json({
        message:'your blog was updated successfully',
        blog
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
};

module.exports = {
  findById, 
  listBlog, 
  deleteBlog,
  recordBlog: addBlog, 
  updateBlog
}