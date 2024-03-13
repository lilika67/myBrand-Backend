const {Schema, model} = require('mongoose');

const blogSchema = new Schema({
  title: {
    type: String, 
    required: true, 
    trim:true,
  
  },

  author: {
    type: String, 
    required: true},
    publishedDate: {type: Date, required: false, default:new Date(),},

    description: {
      type: String, 
      required: true, 
      trim:true,
    
    },
    image: {
      type: String, 
      required: true, 
      trim:true
    }
  
});
const BlogModel = model ('blog', blogSchema)
module.exports = {BlogModel}
