/**
 * This creates a router for nugget operations
 * @author kvermeer
 */

var express = require('express');
var router = express.Router();

var ControllerModule = require('./controllers')
var nuggetController = new ControllerModule.NuggetController();
var userNuggetController = new ControllerModule.UserNuggetController();

router.get('/create', nuggetController.createNuggetPage);
router.post('/create', nuggetController.createNuggetSubmit);
router.get('/:nuggetId', nuggetController.viewNugget);
router.get('/user/:userId', userNuggetController.viewNuggetsForUser);

module.exports = router;
