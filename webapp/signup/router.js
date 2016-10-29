/**
 * This creates a router for signup
 * @author kvermeer
 */

var express = require('express');
var router = express.Router();

var ControllerModule = require('./controllers')
var signupController = new ControllerModule.SignupController();

router.get('/', signupController.getCreateUser);
router.post('/', signupController.postCreateUser);

module.exports = router;
