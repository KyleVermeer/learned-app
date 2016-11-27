/**
 * Controller for managing user signup
 * @author kvermeer
 */

// Dependencies
var BaseComponents = require('../../base');
var UserManagement = require('core/user_management');
var util = require('util');

function SignupController() {}
util.inherits(SignupController, BaseComponents.BaseController);

/**
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
SignupController.prototype.getCreateUser = function(request, response) {
    response.render('pages/user/create_user');
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
            request.session.userId = data.userId; // login user
            response.redirect('/home');
        } else {
            response.send('Whoops!');
        }
    });
}

// Exports
module.exports = SignupController;
