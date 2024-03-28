const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    required: false,
    default: new Date(),
  },
  introduction:{
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  
  image: {
    type: String,
    default: "default.png",
    trim: true
  },
  comments: [
    {
      author: String,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
});

const BlogModel = model('blog', blogSchema);

module.exports = { BlogModel };
