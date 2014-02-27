(function(){
  'use strict';

	Canary.AlertController = Ember.ObjectController.extend({
    actions: {
      archive: function(){
        this.set('active', false);
      }
    }
  });

})();