/**
 * This creates a router for nugget operations
 * @author kvermeer
 */

var express = require('express');
var router = express.Router();

var ControllerModule = require('./controllers')
var nuggetController = new ControllerModule.NuggetController();
var userNuggetController = new ControllerModule.UserNuggetController();

router.get('/create', nuggetController.createNuggetPage.bind(nuggetController));
router.post('/create', nuggetController.createNuggetSubmit.bind(nuggetController));
router.get('/:nuggetId', nuggetController.viewNugget.bind(nuggetController));
router.get('/user/:userId', userNuggetController.viewNuggetsForUser.bind(userNuggetController));

module.exports = router;