const {Schema, model} = require('mongoose');

const messageSchema = new Schema ({
    fullName:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    message:{
      type: String,
      required: true,
      
    },
    Date: {
      type: Date, 
      required: false, 
      default:new Date()}

})

let messageModel = model('message', messageSchema);
module.exports = {messageModel};