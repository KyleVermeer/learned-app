/**
 * This creates a router for user related functions
 * @author kvermeer
 */

var express = require('express');
var router = express.Router();

var ControllerModule = require('./controllers')
var profileController = new ControllerModule.UserProfileController();

router.get('/profile/:userId', profileController.getUserProfile);

module.exports = router;
