/**
 * Controller for basic nugget operations
 * @author kvermeer
 */

// Dependencies
var NuggetManagement = require('core/nugget_management');

function NuggetController() {}

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
    nuggetCRUDService.retrieveNugget(nuggetId, function(nugget, err) {
        if (nugget) {
            response.render('pages/nugget/view_nugget', nugget);
        } else {
            response.send(err);
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
    nuggetCRUDService.createNugget(content, 'markdown', 1, function(id, err) {
        if (id) {
            response.redirect(302, '/nugget/' + id);
        } else {
            response.send(err);
        }
    });
}



module.exports = NuggetController;
