const server = require("../app");
const request = require("supertest");
const { UserModel } = require("../models/user.model");
const mongoose = require("mongoose");

const users = [
  {
    firstName: "kayi",
    lastName: "lili",
    email: "k@gmail.com",
    password: "123",
  },
  {
    firstName: "Ineza",
    lastName: "lili",
    email: "kayi@gmail.com",
    password: "123",
  },
  {
    firstName: "KIKI",
    lastName: "MILO",
    email: "milo@gmail.com",
    password: "123",
  },
  {
    firstName: "Munezero",
    lastName: "Maya",
    email: "maki@gmail.com",
    password: "123",
  },
];
describe("/users ", () => {
  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
      Promise.all([
        UserModel.create({
          firstName: "kayi",
          lastName: "lili",
          email: "k@gmail.com",
          password: "123",
        }),
        UserModel.create({
          firstName: "Ineza",
          lastName: "lili",
          email: "kayi@gmail.com",
          password: "123",
        }),

        UserModel.create({
          firstName: "Munezero",
          lastName: "Maya",
          email: "maki@gmail.com",
          password: "123",
        }),

        UserModel.create({
          firstName: "KIKI",
          lastName: "MILO",
          email: "milo@gmail.com",
          password: "123",
        }),
      ]);
    });
  });
  afterAll((done) => {
    Promise.all([UserModel.deleteOne({ email: "k@gmail.com" })]).then(() => {
      mongoose.disconnect().then(done);
    });
  });

  it("POST /users should record new user successfully", async () => {
    const response = await request(server)
      .post("/api/v1/users")
      .send({
        firstName: "Kayitesi",
        lastName: "Liliane",
        password: "123",
        email: "kayitesililiane73@gmail.com",
      })
      .expect(201);
  });

  // it("GET /users should list all users", async () => {
  //   const response = await request(server)
  //   .get("/api/v1/users")
  //   .expect(200);
  // });

  // it("GET /users should list user by id", async () => {
  //   const user1 = await UserModel.create([users[0]]);
  //   const response = await request(server)
  //     .get(`/api/v1/users/${user1._id}`)
  //     .expect(200);
  // });
  // it("GET /users should fail if user does not exist", async () => {
  //   const userId = new mongoose.Types.ObjectId();
  //   const response = await request(server)
  //     .get(`/api/v1/users/${userId}`)
  //     .expect(404);
  // });

  // it("DELETE /users should delete user", async () => {
  //   const usera = await UserModel.create(users[1]);
  //   const response = await request(server)
  //     .delete(`/api/v1/users/${usera._id}`)
  //     .expect(200);
  // });
  // it("DELETE /users should fail if user not found", async () => {
  //   const usero = await UserModel.create(users[2]);
  //   const response = await request(server)
  //     .delete(`/api/v1/users/${usero._id}`)
  //     .expect(409);
  // });

  // it("PUT /users should update user", async () => {
  //   const createdUser = await UserModel.create(users[0]);
  //   const response = await request(server)
  //     .put(`/api/v1/users/${createdUser._id}`)
  //     .send({ email: "lili8@gmail.com" })
  //     .expect(200);
  // });

  // it("PUT /users should fail to update user if not exist", async () => {
  //   const response = await request(server)
  //     .put(`/api/v1/users/${createdUser._id}`)
  //     .send({ email: "lili8@gmail.com" })
  //     .expect(404);
  // });
});
