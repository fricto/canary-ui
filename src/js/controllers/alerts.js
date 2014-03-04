(function(){

  'use strict';

  Canary.AlertsController = Ember.ArrayController.extend({

    itemController: 'alert',

		// Counts:

    areActiveAlerts: function() {
      return this.filterBy('active', true).get('length') > 0;
    }.property('@each.active'),

    active: function() {
      return this.filterBy('active', true).get('length');
    }.property('@each.active'),

    archived: function() {
      return this.filterBy('active', false).get('length');
    }.property('@each.active'),

		// Subsets:

    activeAlerts: function() {
      return this.filterBy('active', true);
    }.property('@each.active'),

    archivedAlerts: function() {
      return this.filterBy('active', false);
    }.property('@each.active')

  });

})();