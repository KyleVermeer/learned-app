/**
 * Controller for basic nugget operations
 * @author kvermeer
 */

// Dependencies
var BaseComponents = require('../../base');
var NuggetManagement = require('core/nugget_management');
var util = require('util');

function NuggetController() {}
util.inherits(NuggetController, BaseComponents.BaseController);

/**
 * Method for viewing a pre-existing nugget
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
NuggetController.prototype.viewNugget = function(request, response) {
    var nuggetId = request.params.nuggetId;

    // Use NuggetCreationServie to actually query the object
    var nuggetCRUDService = new NuggetManagement.NuggetCRUDService();
    nuggetCRUDService.retrieveNugget(nuggetId).then(function(nugget) {
        if (nugget) {
            response.render('pages/nugget/view_nugget', nugget);
        } else {
            response.status(500).end();
        }
    });
}

/**
 * Method for serving the page to create a new nugget
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
NuggetController.prototype.createNuggetPage = function(request, response) {
    response.render('pages/nugget/create_nugget');
}

/**
 * Method for handling the submit of a new nugget
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
NuggetController.prototype.createNuggetSubmit = function(request, response) {
    var content = request.body.nugget_content;

    // Use NuggetCreationServie to actually create the object
    var nuggetCRUDService = new NuggetManagement.NuggetCRUDService();
    nuggetCRUDService.createNugget(content, 'markdown', 1).then(function(data) {
        response.redirect(302, '/nugget/' + data.nuggetId);
    });
}

module.exports = NuggetController;
