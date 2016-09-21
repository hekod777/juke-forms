'use strict';

juke.config(function($stateProvider) {
  $stateProvider.state('newPlaylist', {
    url: '/playlists/new',
    templateUrl: '/js/playlist/templates/playlist-form.html',
    controller: 'newPlaylist'
  })
  .state('playlist',{
  	url:'/playlist/:id',
  	templateUrl:'/js/playlist/templates/playlist.html',
  	controller:'playlistCtrl',
  })


});