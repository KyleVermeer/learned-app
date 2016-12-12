/**
 * Test file for the NuggetFinderService
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
        var nuggetMock = leche.create(['findAll']);
        var NuggetFinderServiceClass = proxyquire('core/nugget_management/nugget_finder.js', {
            './models/nugget.js': nuggetMock
        });
        var nuggetFinderService = new NuggetFinderServiceClass();

        afterEach(function() {
            sandbox.verifyAndRestore();
        });

        describe('findNuggetsForUser', function() {

            it('should call findAll() on the Nugget class', function() {
                // Setup
                var userId = 2;

                // Mock
                var findAllDeferred = q.defer();
                var findAllStub = sandbox.stub(nuggetMock, 'findAll').returns(findAllDeferred.promise);

                // Execute
                var result = nuggetFinderService.findNuggetsForUser(userId);
                findAllDeferred.resolve({});

                // Assert
                assert.isTrue(findAllStub.calledWith({
                    where: {
                        user_id: userId
                    }
                }));
            });

            it('should return an array of objects containing nugget info', function() {
                // Setup
                var content = 'abc123';
                var contentMarkupFormat = 'lexical';
                var userId = 2;
                var nuggetId = 123;
                var nuggetObject = leche.create(['get']);
                var createdAt = 456;
                var updatedAt = 789;

                // Mock
                var nuggetGetStub = sandbox.stub(nuggetObject, 'get');
                nuggetGetStub.withArgs('nugget_id').returns(nuggetId);
                nuggetGetStub.withArgs('user_id').returns(userId);
                nuggetGetStub.withArgs('content_markup_format').returns(contentMarkupFormat);
                nuggetGetStub.withArgs('content').returns(content);
                nuggetGetStub.withArgs('created_at').returns(createdAt);
                nuggetGetStub.withArgs('updated_at').returns(updatedAt);

                var findAllDeferred = q.defer();
                var findAllStub = sandbox.stub(nuggetMock, 'findAll').returns(findAllDeferred.promise);

                // Execute
                var result = nuggetFinderService.findNuggetsForUser(userId);
                findAllDeferred.resolve([nuggetObject]);

                // Assert
                return result.then(function(resultData) {
                    assert.deepEqual([
                        {
                            nugget_id: nuggetId,
                            user_id: userId,
                            content_markup_format: contentMarkupFormat,
                            content: content,
                            created_at: createdAt,
                            updated_at: updatedAt
                        }
                    ], resultData);
                });
            });
        });

        describe('findRecentlyUpdatedNuggetsForUser', function() {

            it('should call findAll() on the Nugget class', function() {
                // Setup
                var userId = 2;
                var numberOfNuggets = 5;

                // Mock
                var findAllDeferred = q.defer();
                var findAllStub = sandbox.stub(nuggetMock, 'findAll').returns(findAllDeferred.promise);

                // Execute
                var result = nuggetFinderService.findRecentlyUpdatedNuggetsForUser(userId, numberOfNuggets);
                findAllDeferred.resolve({});

                // Assert
                assert.isTrue(findAllStub.calledWith({
                    where: {
                        user_id: userId
                    },
                    order: [
                        ['updated_at', 'DESC']
                    ],
                    limit: numberOfNuggets
                }));
            });

            it('should return an array of objects containing nugget info', function() {
                // Setup
                var content = 'abc123';
                var contentMarkupFormat = 'lexical';
                var userId = 2;
                var nuggetId = 123;
                var nuggetObject = leche.create(['get']);
                var createdAt = 456;
                var updatedAt = 789;
                var numberOfNuggets = 2;

                // Mock
                var nuggetGetStub = sandbox.stub(nuggetObject, 'get');
                nuggetGetStub.withArgs('nugget_id').returns(nuggetId);
                nuggetGetStub.withArgs('user_id').returns(userId);
                nuggetGetStub.withArgs('content_markup_format').returns(contentMarkupFormat);
                nuggetGetStub.withArgs('content').returns(content);
                nuggetGetStub.withArgs('created_at').returns(createdAt);
                nuggetGetStub.withArgs('updated_at').returns(updatedAt);

                var findAllDeferred = q.defer();
                var findAllStub = sandbox.stub(nuggetMock, 'findAll').returns(findAllDeferred.promise);

                // Execute
                var result = nuggetFinderService.findRecentlyUpdatedNuggetsForUser(userId, numberOfNuggets);
                findAllDeferred.resolve([nuggetObject, nuggetObject]);

                // Assert
                return result.then(function(resultData) {
                    assert.deepEqual([
                        {
                            nugget_id: nuggetId,
                            user_id: userId,
                            content_markup_format: contentMarkupFormat,
                            content: content,
                            created_at: createdAt,
                            updated_at: updatedAt
                        },
                        {
                            nugget_id: nuggetId,
                            user_id: userId,
                            content_markup_format: contentMarkupFormat,
                            content: content,
                            created_at: createdAt,
                            updated_at: updatedAt
                        }
                    ], resultData);
                });
            });
        });
    });
});
