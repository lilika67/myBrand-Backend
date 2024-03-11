const  {messageModel}= require('../models/message.model');

const sendMessage = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { fullName, message } = req.body;

    // Create a new message instance
    const newMessage = new messageModel({
      fullName: fullName,
      message: message,
      
      
    });

    // Save the message to the database
    const sentMessage = await newMessage.save();

    // Respond with a success message and the saved message object
    return res.status(201).json({
      message: "Message sent successfully",
      sentMessage: sentMessage
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { sendMessage };
