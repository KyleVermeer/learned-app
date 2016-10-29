/**
 * Controller for managing user signup
 * @author kvermeer
 */
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
         console.log('Name: ' + requestBody.display_name);
         console.log('Email: ' + requestBody.email);
         console.log('Password: ' + requestBody.password);
         var passwordSalt = 10;
         var passwordHash = bcrypt.hashSync(requestBody.password, passwordSalt);
         console.log('Password Hash: ' + passwordHash);
         response.render('pages/user');
     }
}

module.exports.SignupController = SignupController;
