/**
 * Controller for getting nuggets for a user
 * @author kvermeer
 */

// Dependencies
var NuggetManagement = require('core/nugget_management');

function UserNuggetController() {}

/**
 * Method for viewing a pre-existing nugget
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
UserNuggetController.prototype.viewNuggetsForUser = function(request, response) {

    var userId = request.params.userId;
    var nuggetFinder = new NuggetManagement.NuggetFinderService();
    nuggetFinder.findNuggetsForUser(userId).then(function(nuggetList) {
        response.render('pages/nugget/user_nuggets', { nuggetList: nuggetList });
    });
}

// Exports
module.exports = UserNuggetController;
