/**
 * Test file for the NuggetFinderService
 * @author kvermeer
 */
describe('unit/webapp/nugget/controllers/nugget', function() {
    'use strict';

    var sandbox = sinon.sandbox.create();

    describe('NuggetController', function() {
        var nuggetManagementMock = leche.create(['NuggetCRUDService']);
        var nuggetCRUDServiceMock = leche.create(['createNugget']);
        var markedMock = leche.create([]);
        var requestMock = leche.create([]);
        var responseMock = leche.create(['setHeader', 'send', 'render']);

        var NuggetControllerClass = proxyquire('webapp/nugget/controllers/nugget.js', {
            'core/nugget_management': nuggetManagementMock,
            'marked': markedMock
        });
        var nuggetController = new NuggetControllerClass();

        beforeEach(function() {
            sandbox.stub(nuggetManagementMock, 'NuggetCRUDService').returns(nuggetCRUDServiceMock);
        });

        afterEach(function() {
            sandbox.verifyAndRestore();
        });

        describe('createNuggetSubmit', function() {

            it('should call NuggetCRUDService.createNugget()', function() {
                // Setup
                var content = 'a';
                requestMock.body = {
                    nugget_content: content
                };
                var userId = 123;

                // Mock
                sandbox.stub(nuggetController, 'getCurrentUserId').returns(userId);

                var createNuggetDeferred = q.defer();
                var createNuggetStub = sandbox.stub(nuggetCRUDServiceMock, 'createNugget').returns(createNuggetDeferred.promise);

                // Execute
                nuggetController.createNuggetSubmit(requestMock, responseMock);

                // Assert
                assert.isTrue(createNuggetStub.calledWith(content, 'markdown', userId));
            });

            it('should call setHeader() and send() when createNugget promise resolves', function() {
                // Setup
                var content = 'a';
                requestMock.body = {
                    nugget_content: content
                };
                var userId = 123;
                var nuggetId = 456;

                // Mock
                sandbox.stub(nuggetController, 'getCurrentUserId').returns(userId);

                var createNuggetDeferred = q.defer();
                var createNuggetStub = sandbox.stub(nuggetCRUDServiceMock, 'createNugget').returns(createNuggetDeferred.promise);

                var setHeaderStub = sandbox.stub(responseMock, 'setHeader');
                var sendStub = sandbox.stub(responseMock, 'send');

                // Execute
                var result = nuggetController.createNuggetSubmit(requestMock, responseMock);
                createNuggetDeferred.resolve({
                    nuggetId: nuggetId
                });

                // Assert
                var expectedSendPayload = JSON.stringify({
                    data: {
                        nugget_id: nuggetId
                    }
                });

                result.then(function() {
                    assert.isTrue(setHeaderStub.calledWith('Content-Type', 'application/json'));
                    assert.isTrue(sendStub.calledWith(expectedSendPayload));
                });
            });
        });

        describe('createNuggetPage', function() {

            it('should render the pages/nugget/create_nugget template', function() {
                // Mock
                var renderStub = sandbox.stub(responseMock, 'render');

                // Execute
                nuggetController.createNuggetPage(requestMock, responseMock);

                // Assert
                assert.isTrue(renderStub.calledWith('pages/nugget/create_nugget'));
            });
        });
    });


});
