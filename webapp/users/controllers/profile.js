/**
 * Controller for managing user profiles
 * @author kvermeer
 */

 function UserProfileController() {}

 UserProfileController.prototype.getUserProfile = function(request, response) {
     response.send('User Profile Page TBB');
 }

// Exports
 module.exports = UserProfileController;
