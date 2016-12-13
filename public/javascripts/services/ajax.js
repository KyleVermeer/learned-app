/**
 * Service for making AJAX calls
 *
 * @author kvermeer
 */
Box.Application.addService('ajax', function(application) {

    'use strict';

    function makeAjaxCall(httpMethod, path, data) {

        /**
         * Resolver function for our Promise
         *
         * @param {function} resolve - function to call to resolve the Promise
         * @param {function} reject - function to call to reject the Promise
         * @return {void}
         */
        function resolver(resolve, reject) {

            /**
             * Handler function to handle a succesful response from the server
             *
             * @param {object} data - response data
             * @return {void}
             */
            function ajaxSuccessHandler(data) {
                console.log('success');
                resolve();
            }

            /**
             * Handler function to handle a succesful response from the server
             *
             * @param {object} data - failure data
             * @return {void}
             */
            function ajaxFailureHandler(data) {
                reject();
            }

            $.ajax(path, {
                method: httpMethod,
                data: data
            }).done(ajaxSuccessHandler).fail(ajaxFailureHandler);
        }

        return new Promise(resolver);
    }

    // Public Methods
    return {

        /**
         * Makes an ajax post request to the server
         *
         * @param {string} path
         * @param {object} data
         * @return {Promise}
         */
        post: function(path, data) {
            return makeAjaxCall('POST', path, data);
        },

        /**
         * Makes an ajax get request to the server
         *
         * @param {string} path
         * @param {object} data
         * @return {Promise}
         */
        get: function(path, data) {
            return makeAjaxCall('GET', path, data);
        }
    };
});
