juke
	.factory('PlaylistFactory',function($http, $state){
		var PlaylistFactory = {};
		var cachedPlaylists = [];

		PlaylistFactory.fetchAll = function() {
			return $http.get('/api/playlists')
				.then(function(result) {
					angular.copy(result.data, cachedPlaylists);
					return cachedPlaylists;
				})
				.catch(function(err) {
					console.error(err);
				});
		}

		PlaylistFactory.create = function(newPlaylist){
			return $http.post('/api/playlists',newPlaylist)
				.then(function(result){
					cachedPlaylists.push(result.data);
					return result.data;
				})
				.catch(function(err){
					console.log(err);
				})
		}

		PlaylistFactory.fetchOne = function(id){
			return $http.get('/api/playlists/' + id)
				.then(function(result){
					return result.data;
				})
				.catch(function(err){
					console.log(err);
				})
		}

		PlaylistFactory.addSong = function(playlist, song){
			return $http.post('/api/playlists/'+playlist.id + '/songs', song)
				.then(function(result){
					return result.data;
				})
				.catch(function(err){
					console.error(err);
				})

		}

		PlaylistFactory.removeSong = function(playlist, song) {
			return $http.delete('/api/playlists/' + playlist.id + '/songs/' + song.id)
				.then(function() {
					console.log('successfully removed ' + song.name + 'from ' + playlist.name);
				})
				.catch(function(err) {
					console.error(err);
				});
		}

		return PlaylistFactory;
	})