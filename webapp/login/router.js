/**
 * This creates a router for login
 * @author kvermeer
 */

var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();

var ControllerModule = require('./controllers')
var loginController = new ControllerModule.LoginController();

loginRouter.get('/', loginController.getLoginPage);
loginRouter.post('/', loginController.postLoginPage);
logoutRouter.get('/', loginController.logout);

module.exports.LoginRouter = loginRouter;
module.exports.LogoutRouter = logoutRouter;
