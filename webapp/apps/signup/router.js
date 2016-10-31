/**
 * This creates a router for signup
 * @author kvermeer
 */

var express = require('express');
var router = express.Router();

var ControllerModule = require('./controllers')
var signupController = new ControllerModule.SignupController();

router.get('/', signupController.getCreateUser.bind(signupController));
router.post('/', signupController.postCreateUser.bind(signupController));

module.exports = router;
