(function(){

  'use strict';

	Canary.AlertController = Ember.ObjectController.extend({

    actions: {

			// When user clicks archive link on alert, set active to false and return to alert view.
      archive: function(){
        this.set('active', false);
        this.transitionToRoute('alerts');
        console.log('ARCHIVED');
      }

    }

  });

})();