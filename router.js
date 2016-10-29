/**
 * This module represents the main routing system for the application
 * @author kvermeer
 */

function Router() {
    this.signupRouter = require('./webapp/signup/router.js');
    this.usersRouter = require('./webapp/users/router.js');
    this.nuggetRouter = require('./webapp/nugget/router.js');
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
    app.use('/user', this.usersRouter);
    app.use('/nugget', this.nuggetRouter);
}

// Private Methods

/**
 * @param {Express.Request} request - the request object
 * @param {Express.Response} response - the response object
 * @return {void}
 */
Router.prototype._getIndex = function(request, response) {
    response.render('pages/index');
}

// Exports
module.exports = Router;
