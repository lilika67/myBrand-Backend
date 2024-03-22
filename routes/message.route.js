const express = require('express');
const messageRouter = express.Router();
const {sendMessage, deleteMessages, getMessages}  = require('../controllers/message.controller');

messageRouter.post('/', sendMessage);

module.exports = messageRouter;


/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management endpoints
 */

/**
 * @swagger
 * /api/v1/messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     responses:
 *       '200':
 *         description: List of all messages
 *       '500':
 *         description: Internal server error
 */
messageRouter.get('/', getMessages)

/**
 * @swagger
 * /api/v1/messages:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the sender
 *               message:
 *                 type: string
 *                 description: The message content
 *               email:
 *                 type: string
 *                 description: The email content
 *     responses:
 *       201:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Internal server error
 */


messageRouter.post('/', sendMessage);
/**
 * @swagger
 * /api/v1/messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the message to delete
 *     responses:
 *       '200':
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Internal server error
 */


messageRouter.delete('/:id', deleteMessages);


module.exports = messageRouter;

