/**
 * This module represents the routing system for the application
 * @author kvermeer
 */

// Dependencies
var pg = require('pg');
var bcrypt = require('bcrypt');

// Exports
module.exports = createRouter;

class Router {

    /**
     * Binds routes onto an app
     *
     * @param {Express.Application} app - The app on which to bind the routes
     * @return {void}
     */
    bindRoutesToApp(app) {
        app.get('/', this._getIndex);
        app.get('/user', this._getCreateUser);
        app.post('/user', this._postCreateUser);
        app.get('/db', this._getDBSamplePage);
    }

    // Private Methods

    /**
     * @param {Express.Request} request - the request object
     * @param {Express.Response} response - the response object
     * @return {void}
     */
     _getIndex(request, response) {
        response.render('pages/index');
    }

    /**
     * @param {Express.Request} request - the request object
     * @param {Express.Response} response - the response object
     * @return {void}
     */
     _getCreateUser(request, response) {
         response.render('pages/user');
     }

    /**
     * @param {Express.Request} request - the request object
     * @param {Express.Response} response - the response object
     * @return {void}
     */
     _postCreateUser(request, response) {
         var requestBody = request.body;
         console.log('Name: ' + requestBody.display_name);
         console.log('Email: ' + requestBody.email);
         console.log('Password: ' + requestBody.password);
         var passwordSalt = 10;
         var passwordHash = bcrypt.hashSync(requestBody.password, passwordSalt);
         console.log('Password Hash: ' + passwordHash);
         response.render('pages/user');
     }

    /**
     * @param {Express.Request} request - the request object
     * @param {Express.Response} response - the response object
     * @return {void}
     */
    _getDBSamplePage(request, response) {
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            console.log(err);
            client.query('SELECT * FROM test_table', function(err, result) {
                 done();
                 if (err) { console.error(err); response.send("Error " + err); }
                 else { response.render('pages/db', {results: result.rows} ); }
             });
         });
     }
}

/**
 * @return {Router}
 */
function createRouter() {
    return new Router();
}
