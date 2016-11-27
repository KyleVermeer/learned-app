/**
 * Controller for managing user profiles
 * @author kvermeer
 */

// Dependencies
var BaseComponents = require('../../base');
var UserManagement = require('core/user_management');
var util = require('util');

function UserSettingsController() {}
util.inherits(UserSettingsController, BaseComponents.BaseController);

UserSettingsController.prototype.getUserSettingsPage = function(request, response) {
    this.requireLoginIn(request, response);
    var userId = this.getCurrentUserId(request);
    var userProfileService = new UserManagement.UserProfileService();
    userProfileService.getUserProfile(userId, function(userProfile, error) {
        response.render('pages/user/settings', userProfile);
    });
}

// Exports
module.exports = UserSettingsController;