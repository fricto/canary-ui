(function() {

  'use strict';

  Canary.Router.map(function() {
    this.resource('monitors');
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
        controller: this.controllerFor('alerts').set('model', this.store.find('alert'))
      });
    }
  });


  Canary.AlertsRoute = Ember.Route.extend({
   /*
 model: function(){
      return this.store.find('alert');
    }
*/
  });

})();