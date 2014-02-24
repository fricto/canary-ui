(function() {

  'use strict';

  DS.FixtureAdapter.reopen({
    queryFixtures: function(fixtures, query) {
      return fixtures.filter(function(fixture) {
        for ( var queryKey in query ) {
          if (query.hasOwnProperty(queryKey)) {
            var value = query[queryKey];
            
            console.log('FIXTURE QUERY: comparing "' + queryKey + '" in fixture: "' + fixture[queryKey] + '" against query "' +query[queryKey] +'"');
            
            if (fixture[queryKey] !== value) {
              return false;
            }
          }
        }
        return true;
      });
    }
  });

  window.Canary = Ember.Application.create();
  
  Canary.ApplicationAdapter = DS.FixtureAdapter.extend();

})();