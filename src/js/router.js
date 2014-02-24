(function() {

  'use strict';

  Canary.Router.map(function() {
    this.resource('monitors');
    this.resource('monitor', { path: '/monitor/:monitor_id' });
    this.resource('alerts');
  });

  Canary.IndexRoute = Ember.Route.extend({
    redirect: function() {
      this.transitionTo('monitors');
    }
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
        controller: this.generateController('alerts').set('model', this.store.find('alert'))
      });
    }
  });

  Canary.MonitorRoute = Ember.Route.extend({
    model: function(params) {
      var monitor = this.store.find('monitor', params.monitor_id);
      return monitor;
    },
    renderTemplate: function() {
      this.render();
      this.render('alertBox', {
        outlet: 'alerts',
        controller: this.generateController('alerts').set('model', this.store.find('alert'))
      });
    }
  });

  Canary.AlertsRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('model').set('model', this.store.find('alert'));
    },
    renderTemplate: function() {
      this.controllerFor('alerts').forEach(function(item) {
        item.send('archive');
      });
      this.render('alerts', {
        outlet: 'main'
      });
      this.render('alertBox', {
        outlet: 'alerts'
      });
    }
  });

})();