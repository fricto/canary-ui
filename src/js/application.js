(function() {

  'use strict';

  window.Canary = Ember.Application.create();

  // Using fixture for development...
  Canary.ApplicationAdapter = DS.FixtureAdapter.extend();

})();