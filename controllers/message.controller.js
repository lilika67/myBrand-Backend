const  {messageModel}= require('../models/message.model');

const sendMessage = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { fullName,email, message } = req.body;

    // Create a new message instance
    const newMessage = new messageModel({
      fullName: fullName,
      email:email,
      message: message,
      
      
      
    });

    
    const sentMessage = await newMessage.save();
    return res.status(201).json({
      message: "Your Message has sent successfully",
      sentMessage: sentMessage
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error})
  }

  
};

const deleteAllMessages = async (req,res) =>{
  try{
    const deleteAll = await subscribeModel.findByIdAndDelete(req.param.id)
    const remainingMessages = await subscribeModel.find();
    return res.status(200).json({message:"message deleted successfully",remainingMessages});
  }catch(error){
    console.log(error)
    return res.status(404).json({message:"Message  not found"});
  }
}


module.exports = { sendMessage, deleteAllMessages };
