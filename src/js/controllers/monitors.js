(function(){
  'use strict';

  Canary.MonitorsController = Ember.ArrayController.extend({
    total: function() {
      return this.get('length');
    }.property('@each'),
    errorCount: function() {
      return this.filterBy('isError', true).get('length');
    }.property('@each.isError'),
    warnCount: function() {
      return this.filterBy('isWarning', true).get('length');
    }.property('@each.isWarning'),
    normalCount: function() {
      return this.filterBy('isNormal', true).get('length');
    }.property('@each.isNormal'),
    haveAlerts: function () {
      return this.filterBy('hasAlert', true).get('length') > 0;
    }.property('@each'),
    errors: function() {
      return this.filterBy('isError', true);
    }.property('@each.isError'),
    warnings: function() {
      return this.filterBy('isWarning', true);
    }.property('@each.isWarning'),
    normals: function() {
      return this.filterBy('isNormal', true);
    }.property('@each.isNormal'),
    itemController: 'monitor',
		actions: {
			doStuff: function(id) {
				this.transitionToRoute('records', id);
			}
		}

  });

})();