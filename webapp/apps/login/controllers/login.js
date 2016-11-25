/**
 * Controller for login
 * @author kvermeer
 */

// Dependencies
var BaseComponents = require('../../base');
var UserManagement = require('core/user_management');
var util = require('util');

function LoginController() {}
util.inherits(LoginController, BaseComponents.BaseController);

/**
 * Method for rendering the login page
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
LoginController.prototype.getLoginPage = function(request, response) {
    if (this.isUserLoggedIn(request)) {
        response.redirect('/home');
    } else {
        response.render('pages/login/login');
    }
};

/**
 * Method for handling the submit on the login page
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
LoginController.prototype.postLoginPage = function(request, response) {
    var requestBody = request.body;
    var email = requestBody.email;
    var password = requestBody.password;

    var loginService = new UserManagement.LoginService();
    loginService.checkLoginCredentials(email, password).then(function(data) {
        if (data.success) {
            request.session.userId = data.userId;
            response.redirect('/home');
        }
        else {
            response.redirect('/login?error=wrong_credentials');
        }
    });
}

/**
 * Method for handling a logout
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
LoginController.prototype.logout = function(request, response) {
    delete request.session.userId;
    response.redirect('/login');
}

module.exports = LoginController;