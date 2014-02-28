(function(){
  'use strict';

	Canary.ApplicationController = Ember.ArrayController.extend({
		search: '',
		titleFilter: null,
		actions:{
			query: function() {

				var query = this.get('search');

				this.transitionToRoute('search', encodeURIComponent(query));

			}

		},

		arrangedContent: function() {
			var search = this.get('search');
			if (!search) { return this.get('content') }

			return this.get('content').filter(function(note) {
				return note.get('title').indexOf(search) !== -1;
			});

		}.property('content', 'titleFilter')

	});

})();