(function() {

  'use strict';

  Canary.Router.map(function() {
    
    this.resource( 'monitors', { path: '/' });
    
    this.resource('monitor', { path: '/monitor/:monitor_id' }, function() {
      this.route('records');
    });
    
    this.resource('alerts');
    
  });



  Canary.MonitorsRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('model', this.store.find('monitor'));
    },
    renderTemplate: function() {
      console.log("Rendering 'Canary.MonitorsRoute'.");
      this.render('monitors', {
        outlet: 'main'
      });
      this.render('alertBox', {
        outlet: 'alerts',
        controller: this.controllerFor('alerts').set('model', this.store.find('alert', {active: true}))
      });
    }
  });



  Canary.MonitorRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('monitor', params.monitor_id);
    },
    renderTemplate: function() {
      console.log("Rendering 'Canary.MonitorRoute'.");
      this.render('monitor', {
        outlet: 'main'
      });
      this.render('alertBox', {
        outlet: 'alerts',
        controller: this.controllerFor('alerts').set('model', this.store.find('alert', {active: true}))
      });
    }
  });



  Canary.MonitorRecordsRoute = Ember.Route.extend({
    setupController: function(controller) {
      var records = this.controllerFor('monitor').get('records');
      console.log(records.get('length'));
      controller.set('model', records);
    },
    renderTemplate: function() {
      console.log("Rendering 'Canary.MonitorRecordsRoute'.");
      this.render('chart', {
        outlet: 'chart'
      });
    }
  });
  


  Canary.AlertsRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('model', this.store.find('alert', {active: true}));
    },
    renderTemplate: function() {
      console.log("Rendering 'Canary.AlertsRoute'.");
      this.render('alerts', {
        outlet: 'main'
      });
      this.render('alertBox', {
        outlet: 'alerts'
      });
    }
  });

})();