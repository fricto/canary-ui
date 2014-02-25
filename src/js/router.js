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
      controller.set('model', this.controllerFor('monitor').get('records'));
    },
    renderTemplate: function() {
      this.render('records', {
        outlet: 'records'
      });
    }
  });
  


  Canary.AlertsRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('model', this.store.find('alert', {active: true}));
    },
    renderTemplate: function() {
      this.render('alerts', {
        outlet: 'main'
      });
      this.render('alertBox', {
        outlet: 'alerts'
      });
    }
  });

})();