const express = require('express');
const subscribeRouter = express.Router();
const { subscribedUser, getSubscribers, deleteAllSubscribers } = require('../controllers/subscribe.controller');


// Swagger UI Implementation

/**
 * @swagger
 * /api/v1/subscribers:
 *   post:
 *     summary: Subscribe a user
 *     tags: [subscribe]
 *     description: Endpoint to subscribe a user and send confirmation email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user to subscribe.
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: Successfully subscribed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: Thank you for your subscription
 *       500:
 *         description: Internal Server Error
 */

subscribeRouter.post('/', subscribedUser);

/**
 * @swagger
 * /api/v1/subscribers:
 *   get:
 *     summary: Get all subscribers
 *     tags: [subscribe]
 *     description: Endpoint to get all subscribers.
 *     responses:
 *       200:
 *         description: Successfully retrieved subscribers
 *       
 *                   
 *       500:
 *         description: Internal Server Error
 */

subscribeRouter.get('/', getSubscribers);

/**
 * @swagger
 * /api/v1/subscribers/{id}:
 *   delete:
 *     summary: Delete all subscribers
 *     tags: [subscribe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the subscriber to delete
 *     description: Endpoint to delete all subscribers.
 *     responses:
 *       200:
 *         description: Successfully deleted subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: Subscriber deleted successfully
 *                 remainingSubscribers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscribers'
 *       404:
 *         description: Subscriber not found
 *       500:
 *         description: Internal Server Error
 */

subscribeRouter.delete('/:id', deleteAllSubscribers);

module.exports = subscribeRouter;
