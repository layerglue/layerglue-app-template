
// Some useful utility functions to help check DOM element ancestors
(function($){
    $.fn.extend({

        isChildOf: function(parentNode) {
        	return this.closest(parentNode).length > 0;
        },

        hasChild: function(childNode) {
        	return $(childNode).closest(this).length > 0;
        },

        isInDOM: function() {
        	return this.closest('html').length > 0;
        }

    });
})($);