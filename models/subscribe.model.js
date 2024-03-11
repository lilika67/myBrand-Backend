const {Schema, model} = require('mongoose');

const subscribeSchema = new Schema({
  email:{
    type: String,
    required: true,
  }
})

let subscribeModel = model('Subscribe', subscribeSchema);
module.exports = {subscribeModel}

