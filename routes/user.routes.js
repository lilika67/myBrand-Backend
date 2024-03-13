const express = require("express");
const userRouter = express.Router();
const {
  record,
  findById,
  remove,
  getUsers,
  update,
  findByEmail,
} = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Record a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
userRouter.post("/", record);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all  
 *       500:
 *         description: Internal server error
 */
userRouter.get("/", getUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       500:
 *         description: Internal server error
 */
userRouter.get("/:id", findById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.put("/:id", update);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       409:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.delete("/:id", remove);

/**
 * @swagger
 * /api/v1/users/email/{email}:
 *   get:
 *     summary: Find user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: User email
 *     responses:
 *       200:
 *         description: User found
 *       500:
 *         description: Internal server error
 */
userRouter.get("/email/:email", findByEmail);

module.exports = userRouter;
