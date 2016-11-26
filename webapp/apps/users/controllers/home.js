/**
 * Controller for managing the home page for users
 * @author kvermeer
 */

// Dependencies
var BaseComponents = require('../../base');
var NuggetManagement = require('core/nugget_management');
var util = require('util');
var marked = require('marked');

function HomeController() {}
util.inherits(HomeController, BaseComponents.BaseController);

HomeController.prototype.getHomePage = function(request, response) {

    if (!this.isUserLoggedIn(request)) {
        response.redirect('/login');
    }
    var userId = this.getCurrentUserId(request);
    var nuggetFinderService = new NuggetManagement.NuggetFinderService();
    nuggetFinderService.findRecentlyUpdatedNuggetsForUser(userId, 5).then(function(nuggetList) {
        nuggetList.forEach(function(nugget) {
            nugget.content = marked(nugget.content);
        });
        response.render('pages/user/home', { nuggetList: nuggetList });
    });
}

// Exports
module.exports = HomeController;
