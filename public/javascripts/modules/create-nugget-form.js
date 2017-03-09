/**
 * T3 Module for create nugget form
 *
 * @author kvermeer
 */
Box.Application.addModule('create-nugget-form', function(context) {

    'use strict';

    // Private variables
    var moduleEl;

    // Services
    var domService;
    var ajaxService;

    return {

        /**
         * @return {void}
         */
        init: function() {
            this.cacheServices();
            this.cacheDOMElements();
        },

        /**
         * @return {void}
         */
        cacheDOMElements: function() {
            moduleEl = context.getElement();
        },

        /**
         * @return {void}
         */
        cacheServices: function() {
            domService = context.getService('dom');
            ajaxService = context.getService('ajax');
        },

        /**
         * @param {Event} event - event triggering onclick
         * @param {HTMLElement} element - element that is the subject of the clicked
         * @param {string} elementType - the data-type of the element
         * @return {void}
         */
        onclick: function(event, element, elementType) {
            if (elementType === 'create-btn') {
                this.handleCreateButtonClick();
            }
        },

        /**
         * Handler for the create button being clicked
         *
         * @return {void}
         */
        handleCreateButtonClick: function() {
            var editableNuggetEl = domService.query('.editable-nugget', moduleEl);
            var editableNuggetContentEl = domService.query('.nugget-contents', editableNuggetEl);
            var content = editableNuggetContentEl.textContent;
            ajaxService.post('/nugget/create', {
                nugget_content: content
            }).then(function(data) {
                location = '/home';
            });
        }
    };
});
