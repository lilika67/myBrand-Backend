
const {BlogModel} = require('../models/blog.model');
const errorHandler = require('../errors/errorHandler');
const { record } = require('./user.controller');
const addBlog = async (req, res, next) =>{
  try{
    const {title,author} = req.body
    let existBlog = await BlogModel.findOne({title:title,author:author});

    if(existBlog){
      return next(errorHandler(409, "This blog already exists and it can't be added twice"));
    } else {
      var addedblog = await BlogModel.create(req.body);
    res.status(201).json({
      message: "Your blog was added successfully!",
      blog: addedblog
    });
    }
    
  } catch(error) {
    console.log(error);
    res.status(500).send(error);
    
  }
}
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
