/**
 * Controller for managing the home page for users
 * @author kvermeer
 */

// Dependencies
var BaseComponents = require('../../base');
var NuggetManagement = require('core/nugget_management');
var util = require('util');

function HomeController() {}
util.inherits(HomeController, BaseComponents.BaseController);

HomeController.prototype.getHomePage = function(request, response) {

    if (!this.isUserLoggedIn(request)) {
        response.redirect('/login');
    }
    var userId = this.getCurrentUserId(request);
    var nuggetFinderService = new NuggetManagement.NuggetFinderService();
    nuggetFinderService.findRecentlyUpdatedNuggetsForUser(userId, 5).then(function(nuggetList) {
        response.render('pages/nugget/user_nuggets', { nuggetList: nuggetList });
    });
}

// Exports
module.exports = HomeController;
