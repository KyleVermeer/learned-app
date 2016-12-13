/**
 * Test file for the NuggetFinderService
 * @author kvermeer
 */
describe('webapp/nugget/controllers/nugget', function() {
    'use strict';

    var sandbox = require('sinon').sandbox.create();
    var assert = require('chai').assert;
    var leche = require('leche');
    var proxyquire = require('proxyquire').noCallThru();
    var q = require('q');

    describe('NuggetController', function() {
        // @TODO Implement later

        afterEach(function() {
            sandbox.verifyAndRestore();
        });
    });


});
