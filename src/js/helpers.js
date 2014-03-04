/*
(function(){
  'use strict';

  Ember.Handlebars.helper('highlight', function(monitors, options) {
    var escapedTitle = Handlebars.Utils.escapeExpression(options.hash.title);

    var rows = '<tr><td colspan="6">There are no monitors to display!</td></tr>';

    if ( rows.length > 0 ) {
      rows = '';
      for (var n = 0; n<rows.length; n++) {

        rows += ''+
'<tr {{action "viewRecord" id on="click"}} {{bind-attr class="isError:danger isWarning:warning isNormal:success"}}>'+
'	<td>' + rows[n].id + '</td>'+
'	<td>' + rows[n].serviceName + '</td>'+
'	<td>' + rows[n].lastLoggedTime + '</td>'+
'	<td>' + rows[n].status + '/td>'+
'{{#if isError}}'+
'	<td>{{#link-to 'monitor.reset' id class="btn btn-default btn-xs"}}reset{{/link-to}}</td>'+
'{{else}}'+
'	<td>{{average}}</td>'+
'	<td>{{lastResponseType}}</td>'+
'{{/if}}'+
'</tr>';

      }
    }








    return '<p>'+escapedTitle+' - '+monitors.length+'</p>';
  });




    if (  )

    return ''+
'        <table class="table table-striped table-hover">
'        <caption><h2 class="text-left">Normal Services</h2class="text-left"></caption>
'        <thead><tr><th>ID</th><th>Service Name</th><th>Last Logged At</th><th>Status</th><th>Average</th><th>Response</th></tr></thead>
'        <tfoot><tr><td colspan="6" class="text-right">Showing {{normalCount}} monitors.</td></tr></tfoot>
'        <tbody>
'          {{#each}}
'            {{partial "monitorTableRow"}}
'          {{else}}
            {{partial "monitorTableIfEmpty"}}
          {{/each}}
        </tbody>
      </table>


})();
*/