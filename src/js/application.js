(function() {

  'use strict';

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

  window.Canary = Ember.Application.create(/* {LOG_TRANSITIONS: true} */);
  
  //Canary.ApplicationAdapter = DS.FixtureAdapter.extend();
  
  Canary.Store = DS.Store.extend({
    revision:  12,
    adapter: DS.FixtureAdapter
  });

})();