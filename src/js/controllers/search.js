(function(){
  'use strict';

  Canary.SearchController = Ember.ArrayController.extend({
    needs: ['application'],
    itemController: 'monitor',
    searchCount: function() {
      return this.get('searchResults').get('length');
    }.property('monitors.@each'),
    monitorCount: function() {
      return this.get('monitors').get('length');
    }.property('monitors.@each'),
    searchResults: Ember.arrayComputed('monitors', {

      addedItem: function (accumulatedValue, item) {
        if ( item.get( 'serviceName' ).indexOf( this.get( 'controllers.application.search' ) ) > -1 ) {

           accumulatedValue.pushObject( item );
        }
        return  accumulatedValue;
      },

      removedItem: function (accumulatedValue, item) {
        return  accumulatedValue.filter( function(i) { return i.get('id') !== item.get( 'id' ); } );
      }
    })

  });

})();