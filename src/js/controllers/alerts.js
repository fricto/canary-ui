(function(){
  'use strict';

  Canary.AlertsController = Ember.ArrayController.extend({
    total: function() {
      return this.get('length');
    }.property('@each'),
    areActiveAlerts: function() {
      return this.filterBy('active', true).get('length') > 0;
    }.property('@each.active'),
    active: function() {
      return this.filterBy('active', true).get('length');
    }.property('@each.active'),
    archived: function() {
      return this.filterBy('active', false).get('length');
    }.property('@each.active'),
    itemController: 'alert',
    activeAlerts: function() {
      return this.filterBy('active', true);
    }.property('@each.active')
  });

})();