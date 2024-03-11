const request = require("supertest");
const server = require("../app");
const mongoose = require("mongoose");
const {UserModel} = require("../models/user.model");


describe ("/auth", ()=>{
  beforeAll(()=>{
    mongoose.connect(process.env.MONGODB_URL)

  })
  afterAll((done)=>{
    Promise.all([
      UserModel.deleteMany({ email: "blando@gmail.com" }),
      UserModel.deleteMany({ title: "Physics" }),
      
    ]).then(()=>{mongoose.disconnect().then(done)}  )
      
    
    
  })

  it("POST /auth/signup should create an account successfully", async()=>{
    await request(server)
    .post("/api/v1/auth/signup")
    .send({firstName:"blando",lastName:"Ugira",password:"123",email:"blando@gmail.com"})
    .expect(200)
  })
  it("POST /auth/signup should fail to create an account if email exists", async()=>{
    await request(server)
    .post("/api/v1/auth/signup")
    .send({firstName:"blando",lastName:"Ugira",password:"123",email:"blando@gmail.com"})
    .expect(400)
  })


 it("GET /auth should show all users", async()=>{
  await request(server)
  .get("/api/v1/auth")
  .expect(200)
 })
it("POST /auth/signin should signin registered user", async()=>{
  await request(server)
  .post("/api/v1/auth/signin")
  .send({password:"123",email:"blando@gmail.com"})
  .expect(200)
})

it("POST /auth/signin should fail for unsuccessfully signin", async()=>{
  await request(server)
 .post("/api/v1/auth/signin")
  .send({password:"1234", email:"blando@gmail.com"})
  .expect(401)
})


 
})