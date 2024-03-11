const request = require("supertest");
const server = require("../app");
const mongoose = require("mongoose");
const { BlogModel } = require("../models/blog.model");

const blogs = [
  { title: "Physics", author: "Kim", description: "E = mc"},
  { title: "Chemistry", author: "Kim", description: "h20" },
  { title: "Biolog", author: "Kim", description: "h20"},
];
describe(" /blogs", () => {
  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
      Promise.all([
        BlogModel.create({ title: "Physics", author: "Kim", description: "E = mc" }),
        BlogModel.create({ title: "Chemistry", author: "Kim", description: "h20" }),
        BlogModel.create({ title: "job", author: "Kim", description: "h20" }),
        BlogModel.findOne({title:"Physics"}),

      ])
    });
  });

  afterAll((done) => {
    Promise.all([
      BlogModel.deleteMany({ title: "mathoo" }),
      BlogModel.deleteMany({ title: "Physics" }),
      
    ]).then(() => {
      mongoose.disconnect().then(done);
    });
  });
  it("POST /blogs should add a new blog successfully", async () => {
    await request(server)
      .post("/api/v1/blogs")
      .send({ title: "mathoo", author: "Joboo", description: "x+yoo" })
      .expect(201);
  });
  it("POST /blogs should fail when blog exist", async () => {

    await request(server)
      .post("/api/v1/blogs")
      .send({ title: "Physics", author: "Kim", description: "E = mc" })
      .expect(409);
  });
  it("GET /blogs should list all blogs", async ()=>{
    const response = await request(server)
    .get("/api/v1/blogs")
    .expect(200)
    
  })
  
  it("GET /blogs should find blog by title",async ()=>{
    const response = await request(server)
    .get("/api/v1/blogs")
    .send({title:"Physics"})
    .expect(200)
 
  })

  it("GET /blogs should fail when blog does  not exist",async ()=>{
    const blogId = new mongoose.Types.ObjectId();
    const response = await request(server)
    .get(`/api/v1/blogs/${blogId}`)
    .expect(404)
 
  })
 
  it("DELETE /blogs should delete blog by title successfully", async ()=>{
    const blog1 = await BlogModel.create(blogs[1])
    const response = await request(server)
    .delete(`/api/v1/blogs/${blog1._id}`)
    .expect(200)
  })

  it("PUT /blogs should update blog successfully" , async ()=>{
    const created = await BlogModel.create(blogs[0])
    await request(server)
    .put(`/api/v1/blogs/${created._id}`)
    .send({title:"kinya"})
    .expect(200)
  })

});

