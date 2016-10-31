/**
 * This module represents the base controller to be shared by all controllers
 * @author kvermeer
 */

function BaseController() {}

BaseController.prototype.isUserLoggedIn = function(request) {
    return request.session.userId !== undefined && request.session.userId !== null;
}

module.exports = BaseController;
