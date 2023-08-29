const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
  },

  Login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = UsersController;