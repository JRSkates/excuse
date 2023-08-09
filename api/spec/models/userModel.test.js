const mongoose = require('mongoose');

require("../mongoDbHelper")
const User = require("../../models/userModel");


describe("User Model", () => {
  beforeEach((done) => {
    console.log(mongoose.connection.collections);
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  })

  it("should have an email address", () => {
    const user = new User({
      email: "test@example.com",
      password: "testpassword",   
      username: "testuser"
    })
    expect(user.email).toEqual("test@example.com");
  })

  it("should have a password", () => {
    const user = new User({
      email: "test@example.com",
      password: "testpassword",   
      username: "testuser"
    })
    expect(user.password).toEqual("testpassword");
  })

  it("should have a username", () => {
    const user = new User({
      email: "test@example.com",
      password: "testpassword",   
      username: "testuser"
    })
    expect(user.password).toEqual("testpassword");
  })
})