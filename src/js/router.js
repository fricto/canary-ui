"use strict";

Canary.Router.map(function() {
  this.resource('monitors', { path: '/' });
});

Canary.MonitorsRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('monitor');
  }
});