const {subscribeModel} = require('../models/subscribe.model');
const sendEmail = require('../middlewares/sendEmail');


//subscription
const subscribedUser = async(req,res)=>{
  try{
    const {email} = req.body;
    const newSubscriber = new subscribeModel({email:email});

    const savedSubscriber = await newSubscriber.save();
    let subject = "MyBrand Newsletters"
    let message = "Thank you for subscribing to my brand daily newsletters"

    await sendEmail(email,subject, message);
    return res.status(201).json({message: "Thank you for your subscription", savedSubscriber})

  }catch(error){
      console.log(error);
      return res.status(500).json(error);
  }
}

//get all subscribers

const getSubscribers = async(req,res)=>{
 try{
  const allSubscribers = await subscribeModel.find();
  return res.status(201).json({
    message: "These are my subscribers",
    allSubscribers
    
  })
 }catch(error){
  console.log(error);
  return res.status(500).json(error)
 }
}

//delete all subscribers
const deleteAllSubscribers = async (req,res) =>{
  try{
    const deleteAll = await subscribeModel.findByIdAndDelete(req.param.id)
    const remainingSubscribers = await subscribeModel.find();
    return res.status(200).json({message:"subscriber deleted successfully",remainingSubscribers});
  }catch(error){
    console.log(error)
    return res.status(404).json({message:"Subscriber not found"});
  }
}

module.exports = {subscribedUser,getSubscribers,deleteAllSubscribers}
