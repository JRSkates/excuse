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
    })
  })
})