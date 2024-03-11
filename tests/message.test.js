const server = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

describe ("/messages",()=>{
  beforeAll(()=>{
    mongoose.connect(process.env.MONGODB_URL)
  })

  afterAll((done)=>{
    mongoose.disconnect().then((done))
  })

  it("POST /messages should send message sucessfully",async()=>{
    const response = await request(server)
    .post("/api/v1/messages")
    .send({fullName:"lili", message:"Hello there"})
    .expect(201)
  })
  
})