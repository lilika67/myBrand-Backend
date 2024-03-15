const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    firstName: {
        type: String, 
        required: true,
    },
    lastName: {
        type: String, 
        required: true,
    },
    
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },

    
    role:{
        type: String,
        enum: ["visitor","admin"],
        default: "visitor"

    },

    createdAt: {
        type: Date, 
        required: false, 
        default:new Date(),
    
    },
   
} );

const UserModel = model('User', UserSchema);
module.exports = {UserModel};