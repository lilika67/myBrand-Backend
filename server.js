const app = require('./app');
const mongoose = require('mongoose');


app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
      console.log(`> listening on port ${process.env.PORT}`);
      console.log('> mongodb connected successfully');
  })
  .catch(err => console.log("> Couldn't connect to MongoDB..."));
});