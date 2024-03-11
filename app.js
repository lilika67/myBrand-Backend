require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const allRoutes = require('./routes');



const app = express();
 app.use(cors());

 app.use(express.json())

app.get("/", (req,res)=>{
  return res.status(200).json({
    message:"welcome to my api"
  }

  )
})

app.use('/api/v1', allRoutes);


module.exports = app;






