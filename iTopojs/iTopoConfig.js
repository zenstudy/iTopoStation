/**
 * @author mrdoob / http://mrdoob.com/
 */

function iTopoConfig() {

	var name = 'iTopoEarth';

	var storage = {
		'url/api/iTopoEarthRegister' : 'http://127.0.0.1:8081/iTopoEarthRegister',
		'url/api/iTopoEarthLogin' : 'http://127.0.0.1:8081/iTopoEarthLogin',
		
		'language': 'zh',
		'activedStarUserUUID' :'',
		//'exportPrecision': 6,

		//'autosave': false,

		// 'project/title': '',
		// 'project/editable': false,
		// 'project/vr': false,

		// 'project/renderer/antialias': true,
		// 'project/renderer/shadows': true,
		// 'project/renderer/shadowType': 1, // PCF
		// 'project/renderer/physicallyCorrectLights': false,
		// 'project/renderer/toneMapping': 0, // NoToneMapping
		// 'project/renderer/toneMappingExposure': 1,

		'settings/history': false,

		'settings/shortcuts/translate': 'w',
		'settings/shortcuts/rotate': 'e',
		'settings/shortcuts/scale': 'r',
		'settings/shortcuts/undo': 'z',
		'settings/shortcuts/focus': 'f'
	};

	if ( window.localStorage[ name ] === undefined ) {

		window.localStorage[ name ] = JSON.stringify( storage );

	} else {

		var data = JSON.parse( window.localStorage[ name ] );

		for ( var key in data ) {

			storage[ key ] = data[ key ];

		}

	}

	return {

		getKey: function ( key ) {
			return storage[ key ];

		},

		setKey: function () { // key, value, key, value ...

			for ( var i = 0, l = arguments.length; i < l; i += 2 ) {

				storage[ arguments[ i ] ] = arguments[ i + 1 ];

			}

			window.localStorage[ name ] = JSON.stringify( storage );

			console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Saved config to LocalStorage.' );

		},

		clear: function () {

			delete window.localStorage[ name ];

		}

	};

}

export { iTopoConfig };
