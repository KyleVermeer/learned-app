/**
 * Controller for managing user signup
 * @author kvermeer
 */
var UserManagement = require('core/user_management');

function SignupController() {}

/**
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
SignupController.prototype.getCreateUser = function(request, response) {
    response.render('pages/user');
}

/**
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
SignupController.prototype.postCreateUser = function(request, response) {
    var requestBody = request.body;
    var username = requestBody.display_name;
    var login = requestBody.email;
    var password = requestBody.password;

    // Call to UserCreationService to create User
    var userCreationService = new UserManagement.UserCreationService();
    userCreationService.createUser(username, login, password).then(function(data) {
        if (data.userId) {
            response.redirect('/user/profile/' + data.userId);
        } else {
            response.send('Whoops!');
        }
    });
}

// Exports
module.exports = SignupController;
