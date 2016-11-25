/**
 * This module represents the base controller to be shared by all controllers
 * @author kvermeer
 */

function BaseController() {}

/**
 * Returns a boolean indicating if the user is logged in
 *
 * @param {Express.Request} request -  the current request
 * @return {boolean} - true if user is logged in, false otherwise
 */
BaseController.prototype.isUserLoggedIn = function(request) {
    return request.session.userId !== undefined && request.session.userId !== null;
}

/**
 * Returns the user id of the currently logged in user
 *
 * @param {Express.Request} request -  the current request
 * @return {int} - the id of the current user
 */
BaseController.prototype.getCurrentUserId = function(request) {
    return request.session.userId;
}

module.exports = BaseController;
