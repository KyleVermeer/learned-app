/**
 * Controller for basic nugget operations
 * @author kvermeer
 */

function NuggetController() {}

/**
 * Method for viewing a pre-existing nugget
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
NuggetController.prototype.viewNugget = function(request, response) {
    response.send('Under construction');
}

/**
 * Method for serving the page to create a new nugget
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
NuggetController.prototype.createNuggetPage = function(request, response) {
    response.send('Under construction');
}

/**
 * Method for handling the submit of a new nugget
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
NuggetController.prototype.createNuggetSubmit = function(request, response) {
    response.send('Under construction');
}



module.exports = NuggetController;
