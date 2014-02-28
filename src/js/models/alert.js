(function(){
	'use strict';

	Canary.Alert = DS.Model.extend({
	  title: DS.attr(),
	  text: DS.attr(),
	  timestamp: DS.attr(),
	  active: DS.attr(),
	  monitor: DS.belongsTo('monitor',{async:true})
	});

	Canary.Alert.FIXTURES = [
	  {
		  id:0,
		  monitor: 4,
		  title: 'Service Delta issued a warning: short-term latency increase',
		  text: 'Service Delta issued a warning due to a short period of increased response time to above warning threshold.',
		  timestamp: '2014-02-13T20:11:31.789Z',
		  active: true
	  },
	  {
		  id:1,
		  monitor: 4,
		  title: 'Service Delta issued a warning: short-term latency increase',
		  text: 'Service Delta issued a warning due to a short period of increased response time to above warning threshold.',
		  timestamp: '2014-02-17T20:11:31.789Z',
		  active: true
	  },
	  {
		  id:2,
		  monitor: 5,
		  title: 'Service Epsilon is not responding. Logging paused.',
		  text: 'Service Epsilon has failed. It is not responding to monitor requests.',
		  timestamp: '2014-02-17T20:11:31.789Z',
		  active: true
	  },
	  {
		  id:3,
		  monitor: 9,
		  title: 'Service Iota issued a warning: high average latency',
		  text: 'Service Iota issued a warning due an increase in average response time.',
		  timestamp: '2014-02-17T20:11:31.789Z',
		  active: true
	  },
	  {
		  id:4,
		  monitor: 11,
		  title: 'Service Lamda is responding with an error. Logging paused.',
		  text: 'Service Lamda reported that the remote service is not responding.',
		  timestamp: '2014-02-17T20:11:31.789Z',
		  active: true
	  }
	];
})();