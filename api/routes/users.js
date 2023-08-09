var express = require('express');
var router = express.Router();

const UsersController = require("../controllers/userController")

/* GET users listing. */

router.post("/", UsersController.Create)

module.exports = router;
