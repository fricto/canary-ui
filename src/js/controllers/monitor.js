(function(){
  'use strict';

  Canary.MonitorController = Ember.ObjectController.extend({

    // Properties:

    isCardExpanded: false,

    // Calculated Values:

    isError: function() {
      return this.get('status') === 'error';
    }.property('status'),

    isNotError: function() {
      return this.get('status') !== 'error';
    }.property('status'),

    isWarning: function() {
      return this.get('status') === 'warning';
    }.property('status'),

    isNormal: function() {
      return this.get('status') === 'success';
    }.property('status'),

    isNotNormal: function() {
      return this.get('status') !== 'success';
    }.property('status'),

    // Latest Record

    // Get the latest record.
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

    // Timestamp of last logged record.
    lastLoggedTime: function() {
      return this.get('lastLogged.loggedTime');
    }.property('lastLogged'),

    // Response type of last logged record.
    lastResponseType: function() {
      return this.getWithDefault('lastLogged.responseType', '--');
    }.property('lastLogged'),

    // Duration of last logged record.
    lastLoggedDuration: function() {
      return this.get('lastLogged.duration');
    }.property('lastLogged'),

    // Cumulative Stats

    // Array of durations.
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

    // Smallest observed duration.
    minDuration: Ember.computed.min('durations'),

    // Largest observed duration.
    maxDuration: Ember.computed.max('durations'),

    // Average duration
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
    }),

    // Does this record have active allerts?
    hasActiveAlerts: Ember.reduceComputed('alerts', {
      initialValue: false,

      initialize: function (array, changeMeta, instanceMeta) {
        instanceMeta.activeAlerts = 0;
      },

      addedItem: function (accumulatedValue, item, changeMeta, instanceMeta) {
        if ( item.get( 'active' ) === true ) {
          instanceMeta.activeAlerts++;
          accumulatedValue = true;
        }
        return accumulatedValue;
      },

      removedItem: function (accumulatedValue, item, changeMeta, instanceMeta) {
        if ( item.get( 'active' ) === false ) {
          instanceMeta.activeAlerts--;
        }
        return instanceMeta.activeAlerts > 0;
      }
    }),

    // Actions:
    actions: {

      // Toggle the expanded/collapsed state of a card in the grid view.
      toggleCard: function() {
        this.set( 'isCardExpanded', !this.get('isCardExpanded') );
      },

      reset: function() {
        this.set( 'status', 'success' );
        this.transitionToRoute('monitor', this.get('id'));
      }

    }

  });

})();