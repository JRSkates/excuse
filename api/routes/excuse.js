var express = require('express');
var router = express.Router();

const ExcuseController = require('../controllers/excuseGenerator');

router.get('/',
    ExcuseController.generateExcuse
);

module.exports = router;