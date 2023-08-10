const mongoose = require('mongoose');

require("../mongoDbHelper")
const User = require("../../models/userModel");


describe("User Model", () => {
  beforeEach((done) => {
    // console.log(mongoose.connection.collections);
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

  it("can list all users", async () => {
    const dbUsers = await User.find();
    expect(dbUsers).toEqual([]);
  });

  it('should save a user', async () => {
    const user = new User({
      email: "test@example.com",
      password: "testpassword",   
      username: "testuser"
    })
    
    await user.save()

    const dbUser = await User.find()
    console.log(dbUser[0])
    expect(dbUser[0].email).toEqual("test@example.com");
  })
});