"use strict";

Canary.MonitorsController = Ember.ArrayController.extend({
	total: function() {
		return this.get('length');
	}.property('@each'),
	errorCount: function() {
		return this.filterBy('isError', true).get('length');
	}.property('@each.isError'),
	warnCount: function() {
		return this.filterBy('isWarning', true).get('length');
	}.property('@each.isWarning')
});