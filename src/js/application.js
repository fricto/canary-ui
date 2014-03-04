(function() {

  'use strict';

  // Setting up the FixtureAdapter to handle requests correctly.
  // This is for development and testing only.
  DS.FixtureAdapter.reopen({
    queryFixtures: function(fixtures, query) {
      return fixtures.filter(function(fixture) {
        for ( var queryKey in query ) {
          if (query.hasOwnProperty(queryKey)) {
            var value = query[queryKey];
            if (fixture[queryKey] !== value) {
              return false;
            }
          }
        }
        return true;
      });
    }
  });

  // Create the app and assign the DOM Element container.
  window.Canary = Ember.Application.create({
    rootElement:"#canary"
  });

  // Tell the store to use FixtureAdapter.
  // This is for development and testing only.
  Canary.Store = DS.Store.extend({
    revision:  12,
    adapter: DS.FixtureAdapter
  });

})();