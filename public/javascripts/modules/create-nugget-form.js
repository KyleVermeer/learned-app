/**
 * T3 Module for create nugget form
 *
 * @author kvermeer
 */
Box.Application.addModule('create-nugget-form', function(context) {

    'use strict';

    // Private variables
    var moduleEl;
    var formEl;

    // Services
    var domService;

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
            formEl = domService.query('form', moduleEl);
        },

        /**
         * @return {void}
         */
        cacheServices: function() {
            domService = context.getService('dom');
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
            var textAreaEl = domService.query('#contentArea', formEl);
            var content = textAreaEl.value;
        }
    }
});
