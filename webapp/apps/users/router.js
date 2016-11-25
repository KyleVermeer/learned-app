/**
 * This creates a router for user related functions
 * @author kvermeer
 */

var express = require('express');
var ControllerModule = require('./controllers')

var profileRouter = express.Router();
var profileController = new ControllerModule.UserProfileController();

profileRouter.get('/profile/:userId', profileController.getUserProfile);

var homeRouter = express.Router();
var homeController = new ControllerModule.HomeController();

homeRouter.get('/', homeController.getHomePage.bind(homeController));

module.exports.ProfileRouter = profileRouter;
module.exports.HomeRouter = homeRouter;
