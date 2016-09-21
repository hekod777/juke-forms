juke.controller('newPlaylist', function($scope, $state, PlaylistFactory) {
  $scope.playlist = [];

  $scope.save = function(){
  	console.log($scope.newPlaylist.name);

  	PlaylistFactory.create($scope.newPlaylist)
  		.then(function(result){
  			$scope.playlist = PlaylistFactory.cachedPlaylist;
  			$scope.newPlaylist.name = '';
  			console.log(result.id);
  			$state.go('playlist', { id: result.id });
  		})
  		.catch(function(err){
  			console.log(err);
  		})

  }
});

juke.controller('playlistCtrl', function($scope, $stateParams, PlaylistFactory, SongFactory){
	PlaylistFactory.fetchOne($stateParams.id)
		.then(function(result){
			$scope.playlist = result;
		})
		.catch(function(err){
			console.log(err);
		});
	SongFactory.fetchAll()
		.then(function(songs) {
			$scope.songs = songs;
		})
		.catch(function(err) {
			console.error(err);
		});

	$scope.addSong = function(){
		PlaylistFactory.addSong($scope.playlist,$scope.playlistSongs.song)
			.then(function(song){
				console.log($scope.playlist.songs);
				if(song){
					$scope.playlist.songs.push(SongFactory.convert(song));
					$scope.playlistSongs.song = $scope.songs[0];
				}
				console.log(song);
			})
			.catch(function(err){
				console.error(err);
			})
	};
	$scope.removeSong = function(song, idx) {
		PlaylistFactory.removeSong($scope.playlist, song)
			.then(function() {
				$scope.playlist.songs.splice(idx, 1);
				console.log('I don\'t know');
			})
			.catch(function(err) {
				console.error(err);
			})
	}
})