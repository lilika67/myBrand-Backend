const express = require('express');
const messageRouter = express.Router();
const {sendMessage, deleteAllMessages}  = require('../controllers/message.controller');

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
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 sentMessage:
 *                   $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */


messageRouter.post('/', sendMessage);
/**
 * @swagger
 * /api/v1/messages:
 *   post:
 *     summary: delete a message
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
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 sentMessage:
 *                   $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 * 
 */
messageRouter.delete('/', deleteAllMessages);

module.exports = messageRouter;

