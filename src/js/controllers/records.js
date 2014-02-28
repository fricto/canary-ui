(function(){
  'use strict';

  Canary.RecordsController = Ember.ArrayController.extend({
    total: function() {
      return this.get('length');
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
    monitor: Ember.computed.alias("controllers.monitor")
  });

})();