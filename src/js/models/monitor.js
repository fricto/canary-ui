(function(){
  'use strict';
  
  Canary.Monitor = DS.Model.extend({
    records: DS.hasMany('record'),
    serviceName: DS.attr(),
    status: DS.attr(),
    lastLogged: DS.attr(),
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
    }.property('status')
  });
  
  Canary.Monitor.FIXTURES = [
    {
      id:1,
      serviceName:'Service Alpha',
      status:'success',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:2,
      serviceName:'Service Beta',
      status:'success',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:3,
      serviceName:'Service Gamma',
      status:'success',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:4,
      serviceName:'Service Delta',
      status:'warning',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:5,
      serviceName:'Service Epsilon',
      status:'error',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:6,
      serviceName:'Service Zeta',
      status:'success',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:7,
      serviceName:'Service Eta',
      status:'success',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:8,
      serviceName:'Service Theta',
      status:'success',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:9,
      serviceName:'Service Iota',
      status:'warning',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:10,
      serviceName:'Service Kappa',
      status:'success',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:11,
      serviceName:'Service Lambda',
      status:'error',
      lastLogged:'2014-02-17T20:11:31.789Z'
    },
    {
      id:12,
      serviceName:'Service Mu',
      status:'success',
      lastLogged:'2014-02-17T20:11:31.789Z'
    }
  ];
})();