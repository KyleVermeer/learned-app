/**
 * This module represents the main routing system for the application
 * @author kvermeer
 */

function Router() {
    this.signupRouter = require('webapp/signup/router.js');
    this.usersRouter = require('webapp/users/router.js');
    this.nuggetRouter = require('webapp/nugget/router.js');
    this.loginRouter = require('webapp/login/router.js');
    this.tagRouter = require('webapp/tags/router.js');
}

/**
 * Binds routes onto an app
 *
 * @param {Express.Application} app - The app on which to bind the routes
 * @return {void}
 */
Router.prototype.bindRoutesToApp = function(app) {
    app.get('/', this._getIndex);
    app.use('/signup', this.signupRouter);
    app.use('/user', this.usersRouter.ProfileRouter);
    app.use('/home', this.usersRouter.HomeRouter);
    app.use('/nugget', this.nuggetRouter);
    app.use('/login', this.loginRouter.LoginRouter);
    app.use('/logout', this.loginRouter.LogoutRouter);
    app.use('/settings', this.usersRouter.UserSettingsRouter);
    app.use('/tag', this.tagRouter);
}

// Private Methods

/**
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
Router.prototype._getIndex = function(request, response) {
    response.redirect('/login');
}

// Exports
module.exports = Router;
