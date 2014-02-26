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
    }.property('@each.isNormal')
  });
  
  Canary.MonitorController = Ember.ObjectController.extend();
  
  Canary.RecordsController = Ember.ArrayController.extend({
    total: function() {
      return this.get('length');
    }.property('@each'),
    graphLabels: function() {
      
    }.property('@each'),    
    graphData: function() {
      var chartDataSetOptions = {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data: []
      };
      var chartObject = {labels: [], datasets: [chartDataSetOptions]};
      
      this.forEach(function(record) {
        chartObject.labels.push(record.get('loggedTime'));
        chartObject.datasets[0].data.push(record.get('duration'));
      });

      return chartObject;
    }.property('@each'),
    needs: 'monitor',
    monitor: Ember.computed.alias("controllers.needs"),
    itemController: 'record'
  });
  
  Canary.RecordController = Ember.ObjectController.extend();
  
  
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