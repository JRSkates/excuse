const app = require('../../app');
const request = require("supertest");
require("../mongoDbHelper");
const User = require("../../models/userModel");

describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  describe("POST, when all details are provided", () => {
    it("returns a 201", async() => {
      let response = await request(app)
        .post("/users/")
        .send({email: "testemail@test.com", password: "1234", username: "testuser"})
      expect(response.statusCode).toBe(201)
      expect(response.body.message).toBe("OK")
    })

    it("creates a new user", async () => {
      await request(app)
        .post("/users")
        .send({email: "testemail@test.com", password: "1234", username: "testuser"})
      let users = await User.find();
      expect(users[0].email).toBe("testemail@test.com")
      expect(users[0].username).toBe("testuser")
      expect(users[0].password).toBeTruthy();
    })
  })

  describe("POST, when all details are not provided", () => {
    it("returns a 400 when no email", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234", username: "testuser"})
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe("Bad Request")
    })

    it("returns a 400 when no password", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "testemail@test.com", username: "testuser"})
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe("Bad Request")
    })

    it("returns a 400 when no username", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "testemail@test.com", password: "1234"})
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe("Bad Request")
    })

    it("does not create a new user when there is no email", async () => {
      await request(app)
        .post("/users")
        .send({ password: "1234", username: "testuser"})
      let users = await User.find();
      expect(users.length).toBe(0);
    })

    it("does not create a new user when there is no password", async () => {
      await request(app)
        .post("/users")
        .send({ email: "testemail@test.com", username: "testuser"})
      let users = await User.find();
      expect(users.length).toBe(0);
    })

    it("does not create a new user when there is no username", async () => {
      await request(app)
        .post("/users")
        .send({ email: "testemail@test.com", password: "1234"})
      let users = await User.find();
      expect(users.length).toBe(0);
    })
  })
 })