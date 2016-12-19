/**
 * Test file for the authentication.js middleware
 * @author kvermeer
 */
describe('unit/middleware/authentication', function() {
    'use strict';

    var sandbox = sinon.sandbox.create();

    describe('Authentication', function() {

        var Authentication = require('middleware/authentication.js');

        afterEach(function() {
            sandbox.verifyAndRestore();
        });

        describe('_isUserLoggedInThroughSession', function() {

            it('should return false when userId of session is undefined', function() {

                // Setup
                var request = {
                    session: {}
                };

                // Execute
                var result = Authentication._isUserLoggedInThroughSession(request);

                // Assert
                assert.isFalse(result);
            });

            it('should return false when userId of session is null', function() {

                // Setup
                var request = {
                    session: {
                        userId: null
                    }
                };

                // Execute
                var result = Authentication._isUserLoggedInThroughSession(request);

                // Assert
                assert.isFalse(result);
            });

            it('should return true when userId of session is neither null nor undefined', function() {

                // Setup
                var request = {
                    session: {
                        userId: 123
                    }
                };

                // Execute
                var result = Authentication._isUserLoggedInThroughSession(request);

                // Assert
                assert.isTrue(result);
            });
        });

        describe('requireAuthentication', function() {

            it('should call next() when user is logged in through session', function() {

                // Setup
                var request = {
                    session: {
                        userId: 123
                    }
                };
                var response = {};

                // Mock
                var next = sandbox.spy();

                // Execute
                Authentication.requireAuthentication(request, response, next);

                // Assert
                assert.isTrue(next.called);
            });

            it('should call response.redirect() when user is not logged in', function() {

                // Setup
                var request = {
                    session: {
                        userId: null
                    }
                };
                var response = {};
                var next = function(){};

                // Mock
                response.redirect = sandbox.spy();

                // Execute
                Authentication.requireAuthentication(request, response, next);

                // Assert
                assert.isTrue(response.redirect.calledWith('/login'));
            });

        });
    });
});
