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
    hasAlerts: function () {
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
    itemController: 'monitor'
  });
  
  Canary.MonitorController = Ember.ObjectController.extend({
    hasAlert: function() {
      console.log(this.get('alerts').get('length'));
      return this.get('alerts').get('length') > 0;
    }.property('Canary.AlertsController')});
  
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
  
  Canary.AlertController = Ember.ObjectController.extend({
    actions: {
      archive: function(){
        this.set('active', false);
      }
    }
  });
  
})();