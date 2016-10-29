/**
 * Controller for managing user profiles
 * @author kvermeer
 */

// Dependencies
var UserManagement = require('core/user_management');

function UserProfileController() {}

UserProfileController.prototype.getUserProfile = function(request, response) {

    var userId = request.params.userId;
    var userProfileService = new UserManagement.UserProfileService();
    userProfileService.getUserProfile(userId, function(userProfile, error) {
        response.render('pages/user/profile', userProfile);
    });
}

// Exports
module.exports = UserProfileController;
