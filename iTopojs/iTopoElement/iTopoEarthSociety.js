function iTopoEarthSociety() {

	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

	if ( indexedDB === undefined ) {

		console.warn( 'Storage: IndexedDB not available.' );
		return { initSystem: function () {}, getSystemState: function () {}, setSystemState: function () {}, clearSystemState: function () {} };

	}

	var name = 'iTopoEarthSociety';
	var version = 1;

	var database;

	return {

		initSystem: function ( callback ) {

			var request = indexedDB.open( name, version );
			request.onupgradeneeded = function ( event ) {

				var db = event.target.result;

				if ( db.objectStoreNames.contains( 'states' ) === false ) {

					db.createObjectStore( 'states' );

				}

			};
			request.onsuccess = function ( event ) {

				database = event.target.result;

				callback();

			};
			request.onerror = function ( event ) {

				console.error( 'IndexedDB', event );

			};


		},

		getSystemState: function ( callback ) {

			var transaction = database.transaction( [ 'states' ], 'readwrite' );
			var objectStore = transaction.objectStore( 'states' );
			var request = objectStore.get( 0 );
			request.onsuccess = function ( event ) {

				callback( event.target.result );

			};

		},

		setSystemState: function ( data ) {

			var start = performance.now();

			var transaction = database.transaction( [ 'states' ], 'readwrite' );
			var objectStore = transaction.objectStore( 'states' );
			var request = objectStore.put( data, 0 );
			request.onsuccess = function () {

				console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Saved state to IndexedDB. ' + ( performance.now() - start ).toFixed( 2 ) + 'ms' );

			};

		},

		clearSystemState: function () {

			if ( database === undefined ) return;

			var transaction = database.transaction( [ 'states' ], 'readwrite' );
			var objectStore = transaction.objectStore( 'states' );
			var request = objectStore.clear();
			request.onsuccess = function () {

				console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Cleared IndexedDB.' );

			};
		},

		loginiTopoEarth: function( fnAfterLogin ){
			editor.starUser.restoreActiveUser(editor);
				editor.stationDB.fetchUserWithStarUUID(editor.starUser.info.starUUID/*"5E59BDD4-25EE-4E90-A612-4537AFAA80FE"*/, function(starUserInfo){
				editor.starUser.setStarUserInfo(starUserInfo);
				fnAfterLogin();
			});
		},

	};

}

export { iTopoEarthSociety };
