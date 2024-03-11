const express = require('express');
const blogRouter = express.Router();
const { recordBlog, findById, deleteBlog, listBlog, updateBlog} = require('../controllers/blog.controller');

blogRouter.post('/', recordBlog);
blogRouter.get('/', listBlog);
blogRouter.put('/:id', updateBlog);
blogRouter.delete('/:id', deleteBlog);
blogRouter.get('/:id', findById);


module.exports = blogRouter;
