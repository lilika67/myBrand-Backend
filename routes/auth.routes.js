const express = require("express");
const {
  SignIn,
  SignUp,
} = require("../controllers/auth.controller");
const authRoute = express.Router();

// Swagger UI Implementation
/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: Registration management endpoints
 */

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Sign in user
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User signed in successfully
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Internal server error
 */
authRoute.post("/signin", SignIn);

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Sign up new user
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Account created successfully
 *       '401':
 *         description: User with this email already exists
 *       '500':
 *         description: Internal server error
 */
authRoute.post("/signup", SignUp);


module.exports = authRoute;
