const server = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

describe ("/subscribers",()=>{
  beforeAll(()=>{
    mongoose.connect(process.env.MONGODB_URL)
  })

  afterAll((done)=>{
    mongoose.disconnect().then((done))
  })

  it("POST /subscribers",async()=>{
    const response = await request(server)
    .post("/api/v1/subscribers")
    .send({email:"email"})
    .expect(201)
  })
  
})