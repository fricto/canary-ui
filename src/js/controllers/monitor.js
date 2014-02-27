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
    
    lastLoggedDuration: function() {
      return this.get('lastLogged.duration');
    }.property('lastLogged'),
    
    durations: Ember.arrayComputed('records', {
      addedItem: function(array, item, changeMeta) {
        array.insertAt(changeMeta.index, item.get('duration'));
        return array;
      },
      removedItem: function(array, item, changeMeta) {
        array.removeAt(changeMeta.index, 1);
        return array;
      }
    }),
    
    recordCount: Ember.reduceComputed('records', {
      initialValue: 0,
    
      addedItem: function (accumulatedValue) {
        accumulatedValue++;
        return  accumulatedValue;
      },
    
      removedItem: function (accumulatedValue) {
        accumulatedValue--;
        return  accumulatedValue;
      }
    }),
    
    minDuration: Ember.computed.min('durations'),
    
    maxDuration: Ember.computed.max('durations'),
    
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