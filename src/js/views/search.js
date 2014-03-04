(function() {

  'use strict';

  Canary.SearchView = Ember.View.extend({

    didInsertElement: function() {

			Ember.run.scheduleOnce('afterRender', this, 'tooltips');

			Ember.run.debounce(this, this.tooltips, 100);

    },

    tooltips: function () {
	    $('.has-tooltip').tooltip();
    },

    // Actions:
		actions: {

			// Go to a record detail page.
			viewRecord: function(id) {
        this.transitionTo('monitor', id);
      }

		}

  });

})();