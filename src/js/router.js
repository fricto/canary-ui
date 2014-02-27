(function() {

  'use strict';

  Canary.Router.map(function() {
    
    this.resource( 'dashboard', { path: '/dashboard' });
    
    this.resource( 'monitors', { path: '/monitors' });
    
    this.resource('monitor', { path: '/monitor/:monitor_id' }, function() {
      this.resource('records', { path: '/records' });
      this.route('reset');
    });
    
    this.resource('alerts');
    
    this.resource('alert', { path: '/alert/:alert_id' });
    
    this.resource('settings');
    
    this.resource('help');
    
  });



  Canary.IndexRoute = Ember.Route.extend({
    renderTemplate: function(){
      this.transitionTo('monitors');
    }
  });



  Canary.MonitorsRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('content', this.store.find('monitor'));
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



  Canary.RecordsRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('content', this.controllerFor('monitor').get('records'));
      controller.get('graphData');
      controller.get('graphLabels');
    }
  });



  Canary.AlertsRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('content', this.store.find('alert', {active: true}));
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