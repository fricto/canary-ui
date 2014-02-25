(function(){
  'use strict';
  
  Canary.Monitor = DS.Model.extend({
    records: DS.hasMany('record',{async:true}),
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
    }.property('status'),
    alerts: DS.hasMany('alert',{async:true})
  });
  
  Canary.Monitor.FIXTURES = [
    {
			id: 1,
			serviceName: "Service Alpha",
			status: "success",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			records: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
    },
    {
			id: 2,
			serviceName: "Service Beta",
			status: "success",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			records: [26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]
    },
    {
			id: 3,
			serviceName: "Service Gamma",
			status: "success",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			records: [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]
    },
    {
			id: 4,
			serviceName: "Service Delta",
			status: "warning",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			alerts: [0,1],
			records: [76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]
    },
    {
			id: 5,
			serviceName: "Service Epsilon",
			status: "error",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			alerts: [2],
			records: [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125]
    },
    {
			id: 6,
			serviceName: "Service Zeta",
			status: "success",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			records: [126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150]
    },
    {
			id: 7,
			serviceName: "Service Eta",
			status: "success",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			records: [151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175]
    },
    {
			id: 8,
			serviceName: "Service Theta",
			status: "success",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			records: [176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200]
    },
    {
			id: 9,
			serviceName: "Service Iota",
			status: "warning",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			alerts: [3],
			records: [201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225]
    },
    {
			id: 10,
			serviceName: "Service Kappa",
			status: "success",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			records: [226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250]
    },
    {
			id: 11,
			serviceName: "Service Lambda",
			status: "error",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			alerts: [4],
			records: [251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275]
    },
    {
			id: 12,
			serviceName: "Service Mu",
			status: "success",
			lastLogged: "2014-02-17T20: 11: 31.789Z",
			records: [276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300]
		}
  ];
})();