/**
 * Test file for the NuggetCRUDService
 * @author kvermeer
 */
describe('core/nugget_management/crud_nugget', function() {
    'use strict';

    var sandbox = require('sinon').sandbox.create();
    var assert = require('chai').assert;
    var leche = require('leche');
    var proxyquire = require('proxyquire').noCallThru();
    var q = require('q');

    describe('NuggetCRUDService', function() {
        var nuggetMock = leche.create(['create', 'find']);
        var NuggetCRUDServiceClass = proxyquire('core/nugget_management/crud_nugget.js', {
            './models/nugget.js': nuggetMock
        });
        var NuggetCRUDService = new NuggetCRUDServiceClass();

        afterEach(function() {
            sandbox.verifyAndRestore();
        });

        describe('createNugget', function() {

            it('should call create on the Nugget class', function() {
                // Setup
                var content = 'abc123';
                var contentMarkupFormat = 'lexical';
                var userId = 2;

                // Mock
                var createDeferred = q.defer();
                var createStub = sandbox.stub(nuggetMock, 'create').returns(createDeferred.promise);

                // Execute
                var result = NuggetCRUDService.createNugget(content, contentMarkupFormat, userId);
                createDeferred.resolve({});

                // Assert
                assert.isTrue(createStub.called);
            });

            it('should return an object with a nugget id', function() {
                // Setup
                var content = 'abc123';
                var contentMarkupFormat = 'lexical';
                var userId = 2;
                var nuggetId = 123;
                var nuggetObject = leche.create(['get']);

                // Mock
                var createDeferred = q.defer();
                sandbox.stub(nuggetMock, 'create').returns(createDeferred.promise);

                sandbox.stub(nuggetObject, 'get').returns(nuggetId);

                // Execute
                var result = NuggetCRUDService.createNugget(content, contentMarkupFormat, userId);

                // Assert
                result.then(function (resultData) {
                    assert.strictEqual({
                        nuggetId: nuggetId
                    }, resultData);
                });

                // Resolve Promise
                createDeferred.resolve(nuggetObject);
            });
        });
    });
});
