const User = require("../models/userModel")

const UsersController = {
  Create: async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      return res.status(201).json({ message: 'OK' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Bad Request' });
    }
  }
};

module.exports = UsersController;