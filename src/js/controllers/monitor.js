(function(){
  'use strict';

  Canary.MonitorController = Ember.ObjectController.extend({

    lastLogged: Ember.reduceComputed('records', {
      initialValue: undefined,
    
      initialize: function (array, changeMeta, instanceMeta) {
        instanceMeta.dateValue = 0;
        instanceMeta.dateString = '';
      },
    
      addedItem: function (accumulatedValue, item, changeMeta, instanceMeta) {
        var itemLogged = item.get('loggedTime');
        var d = new Date(itemLogged);
        if (!accumulatedValue || d.valueOf() > instanceMeta.dateValue) {
          instanceMeta.dateValue = d.valueOf();
          instanceMeta.dateString = itemLogged;
        }
        return  item;
      },
    
      removedItem: function (accumulatedValue, item, changeMeta, instanceMeta) {
        var itemLogged = item.get('loggedTime');
        var d = new Date(itemLogged);
        if (!accumulatedValue || d.valueOf() > instanceMeta.dateValue) {
          instanceMeta.dateValue = d.valueOf();
          instanceMeta.dateString = itemLogged;
        }
        return  item;
      }
    }),
    lastLoggedTime: function() {
      return this.get('lastLogged.loggedTime');
    }.property('lastLogged'),
    lastResponseType: function() {
      return this.getWithDefault('lastLogged.responseType', '--');
    }.property('lastLogged'),
    average: Ember.reduceComputed('records', {
      initialValue: 0,
    
      initialize: function (array, changeMeta, instanceMeta) {
        instanceMeta.total = 0;
        instanceMeta.count = 0;
      },
    
      addedItem: function (accumulatedValue, item, changeMeta, instanceMeta) {
        instanceMeta.total += parseFloat(item.get('duration'));
        instanceMeta.count++;
        return Math.floor(instanceMeta.total / instanceMeta.count);
      },
    
      removedItem: function (accumulatedValue, item, changeMeta, instanceMeta) {
        instanceMeta.total -= parseFloat(item.get('duration'));
        instanceMeta.count--;
        return Math.floor(instanceMeta.total / instanceMeta.count);
      }
    })    
  });

})();