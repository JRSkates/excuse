const User = require("../models/userModel")

const UsersController = {
  Create: async (req, res) => {
    try {
        const user = new User(req.body)
        user.save()
        return res.status(201).json({message: 'OK'});
    } catch(e) {
        console.log(e);
    }
  }
};

module.exports = UsersController;