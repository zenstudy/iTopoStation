/**
 * @author mrdoob / http://mrdoob.com/
 */

import * as THREE from '../../build/three.module.js';

import { iTopoLoader as _Loader } from './iTopoLoader.js';
import { iTopoHistory as _History } from './iTopoHistory.js';
import { iTopoStorage as _Storage } from './iTopoStorage.js';
import { iTopoStrings } from './iTopoStrings.js';
import { iTopoConfig } from './iTopoConfig.js';
import { iTopoResourceTracker} from './iTopoFrame/iTopoResourceTracker.js';
import { iTopoStationDB } from './iTopoStationDB.js';

var _DEFAULT_CAMERA = new THREE.PerspectiveCamera( 45, 1, 0.1, 10000 );
_DEFAULT_CAMERA.name = 'Camera';
_DEFAULT_CAMERA.position.set( 0, 0, Math.PI* 1800 );
_DEFAULT_CAMERA.lookAt( new THREE.Vector3() );

function iTopoEditor() {

	var Signal = signals.Signal;

	this.signals = {
		// notifications
		userRegisteredOrLogin: new Signal(),
		userLogoff: new Signal(),

		editorCleared: new Signal(),

		savingStarted: new Signal(),
		savingFinished: new Signal(),

		transformModeChanged: new Signal(),
		snapChanged: new Signal(),
		spaceChanged: new Signal(),

		rendererChanged: new Signal(),
		rendererUpdated: new Signal(),

		sceneBackgroundChanged: new Signal(),
		sceneEnvironmentChanged: new Signal(),
		sceneFogChanged: new Signal(),
		sceneFogSettingsChanged: new Signal(),
		sceneGraphChanged: new Signal(),
		sceneRendered: new Signal(),

		cameraChanged: new Signal(),
		cameraResetted: new Signal(),

		geometryChanged: new Signal(),

		baseRegistered: new Signal(),
		objectHovered: new Signal(),
		objectSelected: new Signal(),//important
		objectFocused: new Signal(),
		objectAdded: new Signal(),
		objectChanged: new Signal(),
		objectRemoved: new Signal(),
		objectArrayAdded: new Signal(),

		taskCardSelected: new Signal(),//important

		cameraAdded: new Signal(),
		cameraRemoved: new Signal(),

		helperAdded: new Signal(),
		helperRemoved: new Signal(),

		scriptAdded: new Signal(),
		scriptChanged: new Signal(),
		scriptRemoved: new Signal(),

		windowResize: new Signal(),

		showGridChanged: new Signal(),
		showHelpersChanged: new Signal(),
		historyChanged: new Signal(),

		viewportCameraChanged: new Signal()
	};

	this.config = new iTopoConfig();
	this.history = new _History( this );
	this.storage = new _Storage();
	this.strings = new iTopoStrings( this.config );
	this.loader = new _Loader( this );
	this.camera = _DEFAULT_CAMERA.clone();
	this.stationDB = new iTopoStationDB();
	this.scene = new THREE.Scene();
	this.scene.name = 'Scene';

	this.sceneHelpers = new THREE.Scene();
	{
	  const skyColor = 0xB1E1FF;  // light blue
	  const groundColor = 0xB97A20;  // brownish orange
	  const intensity = 1;
	  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
	  this.sceneHelpers.add(light);
	}

	{
	  const color = 0xFFFFFF;
	  const intensity = 1;
	  const light = new THREE.DirectionalLight(color, intensity);
	  light.position.set(0, 50, 50);
	  this.sceneHelpers.add(light);
	  this.sceneHelpers.add(light.target);
	}

	{
		var ambient = new THREE.AmbientLight(0xffffff);
		this.sceneHelpers.add(ambient);
	}

	{ //lights()光影自己改哦

	    //聚光灯
	    //SpotLight( color：颜色, intensity：强度, distance：发光距离, angle：角度, penumbra：边缘范围, decay：衰减 )
	    var spotLight = new THREE.SpotLight(0xffffff, 1);
	    spotLight.position.set(0, 500, 0);
	    spotLight.angle = Math.PI / 6;
	    spotLight.penumbra = 0.05; //边缘范围，反比
	    spotLight.decay = 2; //衰减系数，反比
	    spotLight.distance = 400; //发光距离
	    spotLight.castShadow = true; //阴影
	    spotLight.shadow.mapSize.width = 1024;
	    spotLight.shadow.mapSize.height = 1024;
	    spotLight.shadow.camera.near = 10; //近截面
	    spotLight.shadow.camera.far = 250;
	    this.sceneHelpers.add(spotLight);

		// 聚光灯显示助手SpotLightHelper( light:灯光, color：颜色 )
	//	var lightHelper = new THREE.SpotLightHelper(spotLight, 0xdfdfdf);
	//	this.sceneHelpers.add(lightHelper);
	}

	this.object = {};
	this.geometries = {};
	this.materials = {};
	this.textures = {};
	this.materialsRefCounter = new Map(); // tracks how often is a material used by a 3D object
	this.scripts = {};

	this.animations = {};
	this.mixer = new THREE.AnimationMixer( this.scene );

	this.selected = null;
	this.helpers = {};

	this.cameras = {};
	this.viewportCamera = this.camera;
	this.addCamera( this.camera );
	this.resourceTracker = new iTopoResourceTracker();

	// {
	// 	this.cameraHelper = new THREE.CameraHelper(this.viewportCamera);
	// 	this.scene.add(this.cameraHelper);
	// }
}

iTopoEditor.prototype = {

	setScene: function ( scene ) {

		this.scene.uuid = scene.uuid;
		this.scene.name = scene.name;

		this.scene.background = ( scene.background !== null ) ? scene.background.clone() : null;

		if ( scene.fog !== null ) this.scene.fog = scene.fog.clone();

		this.scene.userData = JSON.parse( JSON.stringify( scene.userData ) );

		// avoid render per object

		this.signals.sceneGraphChanged.active = false;

		while ( scene.children.length > 0 ) {

			this.addObject( scene.children[ 0 ] );

		}

		this.signals.sceneGraphChanged.active = true;
		this.signals.sceneGraphChanged.dispatch();

	},

	//

	addObject: function ( object, parent, index ) {

		// var scope = this;

		// object.traverse( function ( child ) {

		// 	if ( child.geometry !== undefined ) scope.addGeometry( child.geometry );
		// 	if ( child.material !== undefined ) scope.addMaterial( child.material );

		// 	scope.addCamera( child );
		// 	scope.addHelper( child );

		// } );

		if ( parent === undefined ) {

			this.scene.add( object );

		} else {

		 	parent.children.splice( index, 0, object );
		 	object.parent = parent;

		}

		this.signals.objectAdded.dispatch( object );
		// this.signals.sceneGraphChanged.dispatch();

	},

	addObjectArray: function ( objectArray, parent) {

		var scope = this;

		if ( parent === undefined ) {
			objectArray.forEach(function(obj)
			{
				scope.scene.add( obj );
			});

		} else {
			objectArray.forEach(function(obj)
			{
				scope.scene.add( obj );
				obj.parent = parent;
			});
		}

		this.signals.objectArrayAdded.dispatch( objectArray );
		// this.signals.sceneGraphChanged.dispatch();

	},

	moveObject: function ( object, parent, before ) {

		if ( parent === undefined ) {

			parent = this.scene;

		}

		parent.add( object );

		// sort children array

		if ( before !== undefined ) {

			var index = parent.children.indexOf( before );
			parent.children.splice( index, 0, object );
			parent.children.pop();

		}

		this.signals.sceneGraphChanged.dispatch();

	},

	nameObject: function ( object, name ) {

		object.name = name;
		this.signals.sceneGraphChanged.dispatch();

	},

	removeObject: function ( object ) {

		if ( object.parent === null ) return; // avoid deleting the camera or scene

		var scope = this;

		object.traverse( function ( child ) {

			scope.removeCamera( child );
			scope.removeHelper( child );

			if ( child.material !== undefined ) scope.removeMaterial( child.material );

		} );

		object.parent.remove( object );

		this.signals.objectRemoved.dispatch( object );
		this.signals.sceneGraphChanged.dispatch();

	},

	removeObjectArray: function ( objectArray ) {

		var scope = this;

		objectArray.traverse( function ( obj ) {
			scope.scene.remove( obj );
		} );

		// this.signals.objectRemoved.dispatch( object );
		// this.signals.sceneGraphChanged.dispatch();
	},

	addGeometry: function ( geometry ) {

		this.geometries[ geometry.uuid ] = geometry;

	},

	setGeometryName: function ( geometry, name ) {

		geometry.name = name;
		this.signals.sceneGraphChanged.dispatch();

	},

	addMaterial: function ( material ) {

		if ( Array.isArray( material ) ) {

			for ( var i = 0, l = material.length; i < l; i ++ ) {

				this.addMaterialToRefCounter( material[ i ] );

			}

		} else {

			this.addMaterialToRefCounter( material );

		}

		this.signals.materialAdded.dispatch();

	},

	addMaterialToRefCounter: function ( material ) {

		var materialsRefCounter = this.materialsRefCounter;

		var count = materialsRefCounter.get( material );

		if ( count === undefined ) {

			materialsRefCounter.set( material, 1 );
			this.materials[ material.uuid ] = material;

		} else {

			count ++;
			materialsRefCounter.set( material, count );

		}

	},

	removeMaterial: function ( material ) {

		if ( Array.isArray( material ) ) {

			for ( var i = 0, l = material.length; i < l; i ++ ) {

				this.removeMaterialFromRefCounter( material[ i ] );

			}

		} else {

			this.removeMaterialFromRefCounter( material );

		}
	},

	removeMaterialFromRefCounter: function ( material ) {

		var materialsRefCounter = this.materialsRefCounter;

		var count = materialsRefCounter.get( material );
		count --;

		if ( count === 0 ) {

			materialsRefCounter.delete( material );
			delete this.materials[ material.uuid ];

		} else {

			materialsRefCounter.set( material, count );

		}

	},

	getMaterialById: function ( id ) {

		var material;
		var materials = Object.values( this.materials );

		for ( var i = 0; i < materials.length; i ++ ) {

			if ( materials[ i ].id === id ) {

				material = materials[ i ];
				break;

			}

		}

		return material;

	},

	setMaterialName: function ( material, name ) {

		material.name = name;
		this.signals.sceneGraphChanged.dispatch();

	},

	addTexture: function ( texture ) {

		this.textures[ texture.uuid ] = texture;

	},

	addAnimation: function ( object, animations ) {

		if ( animations.length > 0 ) {

			this.animations[ object.uuid ] = animations;

		}

	},

	//

	addCamera: function ( camera ) {

		if ( camera.isCamera ) {

			this.cameras[ camera.uuid ] = camera;

			this.signals.cameraAdded.dispatch( camera );

		}

	},

	removeCamera: function ( camera ) {

		if ( this.cameras[ camera.uuid ] !== undefined ) {

			delete this.cameras[ camera.uuid ];

			this.signals.cameraRemoved.dispatch( camera );

		}

	},

	//

	addHelper: function () {

		var geometry = new THREE.SphereBufferGeometry( 2, 4, 2 );
		var material = new THREE.MeshBasicMaterial( { color: 0xff0000, visible: false } );

		return function ( object, helper ) {

			if ( helper === undefined ) {

				if ( object.isCamera ) {

					helper = new THREE.CameraHelper( object );

				} else if ( object.isPointLight ) {

					helper = new THREE.PointLightHelper( object, 1 );

				} else if ( object.isDirectionalLight ) {

					helper = new THREE.DirectionalLightHelper( object, 1 );

				} else if ( object.isSpotLight ) {

					helper = new THREE.SpotLightHelper( object, 1 );

				} else if ( object.isHemisphereLight ) {

					helper = new THREE.HemisphereLightHelper( object, 1 );

				} else if ( object.isSkinnedMesh ) {

					helper = new THREE.SkeletonHelper( object.skeleton.bones[ 0 ] );

				} else {

					// no helper for this object type
					return;

				}

				var picker = new THREE.Mesh( geometry, material );
				picker.name = 'picker';
				picker.userData.object = object;
				helper.add( picker );

			}

			this.sceneHelpers.add( helper );
			this.helpers[ object.id ] = helper;

			this.signals.helperAdded.dispatch( helper );

		};

	}(),

	removeHelper: function ( object ) {

		if ( this.helpers[ object.id ] !== undefined ) {

			var helper = this.helpers[ object.id ];
			helper.parent.remove( helper );

			delete this.helpers[ object.id ];

			this.signals.helperRemoved.dispatch( helper );

		}

	},

	//

	addScript: function ( object, script ) {

		if ( this.scripts[ object.uuid ] === undefined ) {

			this.scripts[ object.uuid ] = [];

		}

		this.scripts[ object.uuid ].push( script );

		this.signals.scriptAdded.dispatch( script );

	},

	removeScript: function ( object, script ) {

		if ( this.scripts[ object.uuid ] === undefined ) return;

		var index = this.scripts[ object.uuid ].indexOf( script );

		if ( index !== - 1 ) {

			this.scripts[ object.uuid ].splice( index, 1 );

		}

		this.signals.scriptRemoved.dispatch( script );

	},

	getObjectMaterial: function ( object, slot ) {

		var material = object.material;

		if ( Array.isArray( material ) && slot !== undefined ) {

			material = material[ slot ];

		}

		return material;

	},

	setObjectMaterial: function ( object, slot, newMaterial ) {

		if ( Array.isArray( object.material ) && slot !== undefined ) {

			object.material[ slot ] = newMaterial;

		} else {

			object.material = newMaterial;

		}

	},

	setViewportCamera: function ( uuid ) {

		this.viewportCamera = this.cameras[ uuid ];
		this.signals.viewportCameraChanged.dispatch();

	},

	//

	select: function ( object ) {

		if ( this.selected === object ) return;

		var uuid = null;

		if ( object !== null ) {

			uuid = object.uuid;

		}

		this.selected = object;

		this.config.setKey( 'selected', uuid );
		this.signals.objectSelected.dispatch( object );
		console.log('editor select null object and send it.')

	},

	selectById: function ( id ) {

		if ( id === this.camera.id ) {

			this.select( this.camera );
			return;

		}

		this.select( this.scene.getObjectById( id, true ) );

	},

	selectByUuid: function ( uuid ) {

		var scope = this;

		this.scene.traverse( function ( child ) {

			if ( child.uuid === uuid ) {

				scope.select( child );

			}

		} );

	},

	deselect: function () {

		this.select( null );

	},

	focus: function ( object ) {

		if ( object !== undefined ) {

			this.signals.objectFocused.dispatch( object );

		}

	},

	focusById: function ( id ) {

		this.focus( this.scene.getObjectById( id, true ) );

	},

	clear: function () {

		this.history.clear();
		this.storage.clear();

		this.camera.copy( _DEFAULT_CAMERA );
		this.signals.cameraResetted.dispatch();

		this.scene.name = "Scene";
		this.scene.userData = {};
		this.scene.background = null;
		this.scene.environment = null;
		this.scene.fog = null;

		var objects = this.scene.children;

		while ( objects.length > 0 ) {

			this.removeObject( objects[ 0 ] );

		}

		this.geometries = {};
		this.materials = {};
		this.textures = {};
		this.scripts = {};

		this.animations = {};
		this.mixer.stopAllAction();

		this.deselect();

		this.signals.editorCleared.dispatch();
		this.stationDB.dispose();
		this.resourceTracker.dispose();
	},

	//

	fromJSON: function ( json ) {

		var scope = this;

		var loader = new THREE.ObjectLoader();
		var camera = loader.parse( json.camera );

		this.camera.copy( camera );
		this.signals.cameraResetted.dispatch();

		this.history.fromJSON( json.history );
		this.scripts = json.scripts;

		loader.parse( json.scene, function ( scene ) {

			scope.setScene( scene );

		} );

	},

	toJSON: function () {

		// scripts clean up

		var scene = this.scene;
		var scripts = this.scripts;

		for ( var key in scripts ) {

			var script = scripts[ key ];

			if ( script.length === 0 || scene.getObjectByProperty( 'uuid', key ) === undefined ) {

				delete scripts[ key ];

			}

		}

		//

		return {

			metadata: {},
			project: {
				shadows: this.config.getKey( 'project/renderer/shadows' ),
				shadowType: this.config.getKey( 'project/renderer/shadowType' ),
				vr: this.config.getKey( 'project/vr' ),
				physicallyCorrectLights: this.config.getKey( 'project/renderer/physicallyCorrectLights' ),
				toneMapping: this.config.getKey( 'project/renderer/toneMapping' ),
				toneMappingExposure: this.config.getKey( 'project/renderer/toneMappingExposure' )
			},
			camera: this.camera.toJSON(),
			scene: this.scene.toJSON(),
			scripts: this.scripts,
			history: this.history.toJSON()

		};

	},

	objectByUuid: function ( uuid ) {

		return this.scene.getObjectByProperty( 'uuid', uuid, true );

	},

	objectByiTopoUUID: function ( uuid ) {
		var scope = this;
		for ( let i = 0, l = scope.scene.children.length; i < l; i ++ ) {
			const child = scope.scene.children[ i ];
			if ( child.userData.objectUUID !== undefined && child.userData.objectUUID === uuid ) {
				return child;
			}
		}
		return undefined;
	},

	execute: function ( cmd, optionalName ) {

		this.history.execute( cmd, optionalName );

	},

	undo: function () {

		this.history.undo();

	},

	redo: function () {

		this.history.redo();

	}

};

export { iTopoEditor };
