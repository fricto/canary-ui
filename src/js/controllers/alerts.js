(function(){
  'use strict';

  Canary.AlertsController = Ember.ArrayController.extend({
    total: function() {
      return this.get('length');
    }.property('@each'),
    active: function() {
      return this.filterBy('active', true).get('length');
    }.property('@each.isError'),
    archived: function() {
      return this.filterBy('active', false).get('length');
    }.property('@each.isError'),
    itemController: 'alert'
  });

})();