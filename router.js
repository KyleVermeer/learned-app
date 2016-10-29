/**
 * This module represents the routing system for the application
 * @author kvermeer
 */

// Dependencies
var pg = require('pg');

// Exports
module.exports = createRouter;

function Router() {

    this.signupRouter = require('./webapp/signup/router.js');

    /**
     * Binds routes onto an app
     *
     * @param {Express.Application} app - The app on which to bind the routes
     * @return {void}
     */
    this.bindRoutesToApp = function(app) {
        app.get('/', this._getIndex);
        app.get('/db', this._getDBSamplePage);
        app.use('/signup', this.signupRouter);
    }

    // Private Methods

    /**
     * @param {Express.Request} request - the request object
     * @param {Express.Response} response - the response object
     * @return {void}
     */
     this._getIndex = function(request, response) {
        response.render('pages/index');
    }

    /**
     * @param {Express.Request} request - the request object
     * @param {Express.Response} response - the response object
     * @return {void}
     */
    this._getDBSamplePage = function(request, response) {
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
