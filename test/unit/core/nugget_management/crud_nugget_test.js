/**
 * Test file for the NuggetCRUDService
 * @author kvermeer
 */
describe('unit/core/nugget_management/crud_nugget', function() {
    'use strict';

    var sandbox = sinon.sandbox.create();

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
                assert.isTrue(createStub.calledWith({
                    content: content,
                    content_markup_format: contentMarkupFormat,
                    user_id: userId
                }));
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

        describe('retrieveNugget', function() {

            it('should call find on the Nugget class', function() {
                // Setup
                var nuggetId = 2;

                // Mock
                var findDeferred = q.defer();
                var findStub = sandbox.stub(nuggetMock, 'find').returns(findDeferred.promise);

                // Execute
                var result = NuggetCRUDService.retrieveNugget(nuggetId);
                findDeferred.resolve({});

                // Assert
                assert.isTrue(findStub.calledWith({
                    attributes: ['nugget_id', 'user_id', 'content_markup_format', 'content', 'created_at', 'updated_at'],
                    where: {
                        'nugget_id': nuggetId
                    }
                }));
            });

            it('should return an object with nugget properties', function() {
                // Setup
                var content = 'abc123';
                var contentMarkupFormat = 'lexical';
                var userId = 2;
                var nuggetId = 123;
                var nuggetObject = leche.create(['get']);
                var createdAt = 456;
                var updatedAt = 789;

                // Mock
                var findDeferred = q.defer();
                sandbox.stub(nuggetMock, 'find').returns(findDeferred.promise);

                var nuggetGetStub = sandbox.stub(nuggetObject, 'get');
                nuggetGetStub.withArgs('nugget_id').returns(nuggetId);
                nuggetGetStub.withArgs('user_id').returns(userId);
                nuggetGetStub.withArgs('content_markup_format').returns(contentMarkupFormat);
                nuggetGetStub.withArgs('content').returns(content);
                nuggetGetStub.withArgs('created_at').returns(createdAt);
                nuggetGetStub.withArgs('updated_at').returns(updatedAt);

                // Execute
                var result = NuggetCRUDService.retrieveNugget(nuggetId);
                findDeferred.resolve(nuggetObject);

                // Assert
                return result.then(function (resultData) {
                    assert.deepEqual({
                        nugget_id: nuggetId,
                        user_id: userId,
                        content_markup_format: contentMarkupFormat,
                        content: content,
                        created_at: createdAt,
                        updated_at: updatedAt
                    }, resultData);
                });
            });

        });
    });
});
