/**
 * Test file for the NuggetFinderService
 * @author kvermeer
 */
describe('unit/webapp/users/controllers/settings', function() {
    'use strict';

    var sandbox = sinon.sandbox.create();

    describe('UserSettingsController', function() {
        var UserManagementMock = leche.create(['UserProfileService']);
        var UserProfileServiceMock = leche.create(['getUserProfile']);
        var requestMock = leche.create([]);
        var responseMock = leche.create(['render']);

        var UserSettingsControllerClass = proxyquire('webapp/users/controllers/settings.js', {
            'core/user_management': UserManagementMock,
        });
        var userSettingsController = new UserSettingsControllerClass();

        beforeEach(function() {
            sandbox.stub(UserManagementMock, 'UserProfileService').returns(UserProfileServiceMock);
        });

        afterEach(function() {
            sandbox.verifyAndRestore();
        });

        describe('getUserSettingsPage', function() {

            beforeEach(function() {
                sandbox.stub(userSettingsController, 'requireLoginIn');
            });

            it('should call UserProfileService.getUserProfile()', function() {
                // Setup
                var userId = 123;

                // Mock
                sandbox.stub(userSettingsController, 'getCurrentUserId').returns(userId);

                var getUserProfileDeferred = q.defer();
                var getUserProfileStub = sandbox.stub(UserProfileServiceMock, 'getUserProfile').returns(getUserProfileDeferred.promise);

                // Execute
                userSettingsController.getUserSettingsPage(requestMock, responseMock);

                // Assert
                assert.isTrue(getUserProfileStub.calledWith(userId));
            });
        });
    });


});
