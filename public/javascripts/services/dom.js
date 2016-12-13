/**
 * Service for abstracting common DOM operations
 *
 * @author kvermeer
 */
Box.Application.addService('dom', function(application) {

    return {

        /**
         * Searches for the element specified by the selector.
         *
         * If a second argument is provided, this will be used as the container for the search.
         *
         * @param {string} selector - CSS selector used to query element
         * @param {HTMLElement} element - the container element to search
         * @return {HTMLElement} - the retrieved element
         */
        query: function(selector, element) {
            return $(element || document).find(selector)[0];
        }
    }
});
