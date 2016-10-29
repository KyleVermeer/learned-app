/**
 * This creates a router for nugget operations
 * @author kvermeer
 */

var express = require('express');
var router = express.Router();

var ControllerModule = require('./controllers')
var nuggetController = new ControllerModule.NuggetController();

router.get('/', nuggetController.createNuggetPage);
router.post('/', nuggetController.createNuggetSubmit);
router.get('/:nuggetId', nuggetController.viewNugget);

module.exports = router;
