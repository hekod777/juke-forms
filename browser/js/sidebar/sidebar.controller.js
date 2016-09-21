'use strict';

juke.controller('SidebarCtrl', function ($scope, PlaylistFactory) {
  // nothing to see here for now… state transitions happening with ui-sref!
  PlaylistFactory.fetchAll()
  	.then(function(playlists) {
  		$scope.playlists = playlists;
  	})
  	.catch(function(err) {
  		console.error(err);
  	});

});
