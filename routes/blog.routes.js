const express = require("express");
const blogRouter = express.Router();
const blogs = require('../models/blog.model');
const multer = require('multer');
const {
  recordBlog,
  findById,
  deleteBlog,
  listBlog,
  updateBlog,
} = require("../controllers/blog.controller");

// Swagger UI Implementation
/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management endpoints
 */

/**
 * @swagger
 * /api/v1/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       409:
 *         description: Blog with the same title and author already exists
 *       500:
 *         description: Internal server error
 */
blogRouter.post("/", recordBlog);

/**
 * @swagger
 * /api/v1/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of all blogs 
 *       500:
 *         description: Internal server error
 */
blogRouter.get("/", listBlog);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog' 
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
blogRouter.get("/:id", findById);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description: 
 *                 type: string 
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
blogRouter.put("/:id", updateBlog);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       400:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
blogRouter.delete("/:id", deleteBlog);

const storage = multer.diskStorage({
  destination:(req, file, callback) =>{
    callback(null, "./database/uploads" )

  },
  filename: (req, file, callback) =>{
    callback(null, file.originalname);
  }
});
const uploads = multer({storage : storage});

module.exports = blogRouter;
