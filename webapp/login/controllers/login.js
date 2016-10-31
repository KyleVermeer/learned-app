/**
 * Controller for login
 * @author kvermeer
 */

// Dependencies
var UserManagement = require('core/user_management');

function LoginController() {}

/**
 * Method for rendering the login page
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
LoginController.prototype.getLoginPage = function(request, response) {
    response.render('pages/login/login');
}

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
            request.session.user_id = data.userId;
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
    delete request.session.user_id;
    response.redirect('/login');
}

module.exports = LoginController;
