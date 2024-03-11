const {UserModel} = require('../models/user.model');


const record  = async (req, res, next) => {
  try {
    var recordedUser = await UserModel.create(req.body);
    res.status(201).json({
      message:"User recorded successfully!",
      user: recordedUser
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

//get all users
const getUsers = async (req, res, next) => {
  try {
    var allUsers = await UserModel.find({});
    res.status(200).json({
      savedUser: allUsers
    });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const userId = req.query.id;
    const foundUser = await UserModel.findById(userId);

    if (foundUser) {
      res.status(200).json({
        user: foundUser
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findByEmail = async (req, res, next) => {
  try {
    let userEmail = req.params.email;
    var foundUser = await UserModel.find({ email: userEmail });
    res.status(200).json({
      user: foundUser
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res, next) => {
  try {
    var deletedUser = await UserModel.findByIdAndDelete(req.query.id);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully!" });
    } else {
      res.status(409).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res, next) => {
  try {
    console.log(req.body, req.query.id);
    var updatedUser = await UserModel.findByIdAndUpdate({ _id: req.query.id }, req.body);
    if(updatedUser === null){
      return res.status(404).json({message: "User not found"}) 
    }
    var user = await UserModel.findById(updatedUser._id);
    res.status(201).json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
module.exports = {
  findByEmail,
  findById,
  getUsers,
  remove,
  record,
  update,  
};
