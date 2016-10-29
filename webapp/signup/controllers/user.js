/**
 * Controller for managing user signup
 * @author kvermeer
 */
var UserManagement = require('core/user_management');

function SignupController() {

    /**
     * @param {Express.Request} request - the request object
     * @param {Express.Response} response - the response object
     * @return {void}
     */
     this.getCreateUser = function(request, response) {
         response.render('pages/user');
     }

    /**
     * @param {Express.Request} request - the request object
     * @param {Express.Response} response - the response object
     * @return {void}
     */
     this.postCreateUser = function(request, response) {
         var requestBody = request.body;
         var username = requestBody.display_name;
         var login = requestBody.email;
         var password = requestBody.password;
         console.log('Name: ' + username);
         console.log('Email: ' + login);
         console.log('Password: ' + password);
         var userCreationService = new UserManagement.UserCreationService();
         userCreationService.createUser(username, login, password);
         response.render('pages/user');
     }
}

module.exports.SignupController = SignupController;
