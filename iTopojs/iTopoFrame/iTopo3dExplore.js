import { TransformControls } from '../../../examples/jsm/controls/TransformControls.js';
import { TrackballControls } from '../../../examples/jsm/controls/TrackballControls.js';
import { OrbitControls } from '../../../examples/jsm/controls/OrbitControls.js';

var iTopo3dExplore = {

	Explore: function () {

		var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		//renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.setClearColor( '#86c9c9' );

		// var project = json.project;
		// if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
		// if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
		// if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
		// if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
		// if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
		// if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;

		var camera, scene, controls;
		var vrButton = VRButton.createButton( renderer );
		var events = {};

		var dom = document.createElement( 'div' );
		dom.appendChild( renderer.domElement );
		this.dom = dom;

		this.width = 500;
		this.height = 500;

		this.show3D = function (background_texture, object ) {

			var scene = new THREE.Scene();
			scene.background = background_texture;
			this.setScene(scene);
			if(object !== null || object !== undefined){
				this.addObject(object);
			}

			scene.add(new THREE.AmbientLight(0x0c0c0c));

			let spotLight = new THREE.SpotLight(0xffffff);
			spotLight.position.set(-400, -400, -400);

			let spotLight2 = new THREE.SpotLight(0xffffff);
			spotLight2.position.set(400, 800, 400);

			scene.add(spotLight);
			scene.add(spotLight2);

			var camera = new THREE.PerspectiveCamera(75, renderer.domElement.innerWidth/renderer.domElement.innerHeight, 0.1, 200);
			camera.name = 'Camera';
			camera.position.set( 0, 0, 100 );
			camera.lookAt(0,0,0);
			this.setCamera(camera);

			// var controls = new OrbitControls( camera, renderer.domElement );
			// controls.maxPolarAngle = Math.PI * 0.5;
			// controls.minDistance = 10;
			// controls.maxDistance = 75;
			// controls.target.set( 0, 2.5, 0 );
			// controls.update();

			// controls = new TrackballControls( camera, renderer.domElement );
			// controls.minDistance = 2;
			// controls.maxDistance = 500;
			// controls.noRotate = false;
			// controls.noZoom = false;
			// controls.noPan = false;

			/* 属性参数 */
			//controls.rotateSpeed = 1;// 旋转速度
			//controls.zoomSpeed = 1;// 缩放速度
			//controls.panSpeed = 1;// 平controls
			//controls.staticMoving = false;// 静止移动，为 true 则没有惯性
			//controls.dynamicDampingFactor = 0.2;// 阻尼系数 越小 则滑动越大

			controls = new OrbitControls(camera, renderer.domElement);
			controls.minDistance = 2;
			controls.maxDistance = 500;
			controls.enablePan = true;
			controls.enableZoom = true;

			var axes = new THREE.AxesHelper(2.72);
			scene.add(axes);

			events = {
				init: [],
				start: [],
				stop: [],
				keydown: [],
				keyup: [],
				mousedown: [],
				mouseup: [],
				mousemove: [],
				touchstart: [],
				touchend: [],
				touchmove: [],
				update: []
			};

			dispatch( events.init, arguments );
		};

		this.setCamera = function ( value ) {
			camera = value;
			camera.aspect = this.width / this.height;
			camera.updateProjectionMatrix();
		};

		this.setScene = function ( value ) {
			scene = value;
		};

		this.addObject = function( object ) {
			scene.add(object);
		}

		this.setSize = function ( width, height ) {

			this.width = width;
			this.height = height;

			if ( camera ) {
				camera.aspect = this.width / this.height;
				camera.updateProjectionMatrix();
			}

			if ( renderer ) {
				renderer.setSize( width, height );
			}

		};

		function dispatch( array, event ) {

			for ( var i = 0, l = array.length; i < l; i ++ ) {
				array[ i ]( event );
			}

		}

		var time, prevTime;

		function animate() {

			time = performance.now();

			try {
				dispatch( events.update, { time: time, delta: time - prevTime } );
			} catch ( e ) {
				console.error( ( e.message || e ), ( e.stack || "" ) );
			}
			console.log('animate..........');
			//console.log(controls.noRotate+ ',' + controls.noZoom + ',' + controls.noPan);
			controls.update();
			scene.rotation.y += 0.001;
			renderer.setViewport( 0, 0, renderer.domElement.offsetWidth, renderer.domElement.offsetHeight );
			renderer.render( scene, camera );
			prevTime = time;
		}

		this.play = function () {
			if ( renderer.xr.enabled ) dom.append( vrButton );
			prevTime = performance.now();

			document.addEventListener( 'keydown', onDocumentKeyDown );
			document.addEventListener( 'keyup', onDocumentKeyUp );
			document.addEventListener( 'mousedown', onDocumentMouseDown );
			document.addEventListener( 'mouseup', onDocumentMouseUp );
			document.addEventListener( 'mousemove', onDocumentMouseMove );
			document.addEventListener( 'touchstart', onDocumentTouchStart );
			document.addEventListener( 'touchend', onDocumentTouchEnd );
			document.addEventListener( 'touchmove', onDocumentTouchMove );

			dispatch( events.start, arguments );
			renderer.setAnimationLoop( animate );
		};

		this.stop = function () {
			if ( renderer.xr.enabled ) vrButton.remove();

			document.removeEventListener( 'keydown', onDocumentKeyDown );
			document.removeEventListener( 'keyup', onDocumentKeyUp );
			document.removeEventListener( 'mousedown', onDocumentMouseDown );
			document.removeEventListener( 'mouseup', onDocumentMouseUp );
			document.removeEventListener( 'mousemove', onDocumentMouseMove );
			document.removeEventListener( 'touchstart', onDocumentTouchStart );
			document.removeEventListener( 'touchend', onDocumentTouchEnd );
			document.removeEventListener( 'touchmove', onDocumentTouchMove );

			dispatch( events.stop, arguments );
			renderer.setAnimationLoop( null );
		};

		this.dispose = function () {
			renderer.dispose();
			camera = undefined;
			scene = undefined;
		};

		//

		function onDocumentKeyDown( event ) {
			dispatch( events.keydown, event );
		}

		function onDocumentKeyUp( event ) {
			dispatch( events.keyup, event );
		}

		function onDocumentMouseDown( event ) {

			dispatch( events.mousedown, event );
		}

		function onDocumentMouseUp( event ) {
			dispatch( events.mouseup, event );
		}

		function onDocumentMouseMove( event ) {
			dispatch( events.mousemove, event );
		}

		function onDocumentTouchStart( event ) {
			dispatch( events.touchstart, event );
		}

		function onDocumentTouchEnd( event ) {
			dispatch( events.touchend, event );
		}

		function onDocumentTouchMove( event ) {
			dispatch( events.touchmove, event );
		}
	},


	Player: function () {

		var renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.outputEncoding = THREE.sRGBEncoding;

		var camera, scene;
		var vrButton = VRButton.createButton( renderer );
		var events = {};

		var dom = document.createElement( 'div' );
		dom.appendChild( renderer.domElement );
		this.dom = dom;

		this.width = 500;
		this.height = 500;

		this.load = function ( json ) {

			var project = json.project;

			if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
			if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
			if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
			if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
			if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
			if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;

			var loader = new THREE.ObjectLoader();
			this.setScene( loader.parse( json.scene ) );
			this.setCamera( loader.parse( json.camera ) );

			events = {
				init: [],
				start: [],
				stop: [],
				keydown: [],
				keyup: [],
				mousedown: [],
				mouseup: [],
				mousemove: [],
				touchstart: [],
				touchend: [],
				touchmove: [],
				update: []
			};

			var scriptWrapParams = 'player,renderer,scene,camera';
			var scriptWrapResultObj = {};

			for ( var eventKey in events ) {

				scriptWrapParams += ',' + eventKey;
				scriptWrapResultObj[ eventKey ] = eventKey;

			}

			var scriptWrapResult = JSON.stringify( scriptWrapResultObj ).replace( /\"/g, '' );

			for ( var uuid in json.scripts ) {
				var object = scene.getObjectByProperty( 'uuid', uuid, true );
				if ( object === undefined ) {
					console.warn( 'APP.Player: Script without object.', uuid );
					continue;
				}

				var scripts = json.scripts[ uuid ];
				for ( var i = 0; i < scripts.length; i ++ ) {
					var script = scripts[ i ];
					var functions = ( new Function( scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';' ).bind( object ) )( this, renderer, scene, camera );
					for ( var name in functions ) {
						if ( functions[ name ] === undefined ) continue;
						if ( events[ name ] === undefined ) {
							console.warn( 'APP.Player: Event type not supported (', name, ')' );
							continue;
						}
						events[ name ].push( functions[ name ].bind( object ) );
					}
				}
			}

			dispatch( events.init, arguments );

		};

		this.setCamera = function ( value ) {
			camera = value;
			camera.aspect = this.width / this.height;
			camera.updateProjectionMatrix();
		};

		this.setScene = function ( value ) {
			scene = value;
		};

		this.setSize = function ( width, height ) {

			this.width = width;
			this.height = height;

			if ( camera ) {
				camera.aspect = this.width / this.height;
				camera.updateProjectionMatrix();
			}

			if ( renderer ) {
				renderer.setSize( width, height );
			}

		};

		function dispatch( array, event ) {

			for ( var i = 0, l = array.length; i < l; i ++ ) {
				array[ i ]( event );
			}

		}

		var time, prevTime;

		function animate() {

			time = performance.now();
			try {
				dispatch( events.update, { time: time, delta: time - prevTime } );
			} catch ( e ) {
				console.error( ( e.message || e ), ( e.stack || "" ) );
			}

			renderer.render( scene, camera );
			prevTime = time;
		}

		this.play = function () {
			if ( renderer.xr.enabled ) dom.append( vrButton );
			prevTime = performance.now();

			document.addEventListener( 'keydown', onDocumentKeyDown );
			document.addEventListener( 'keyup', onDocumentKeyUp );
			document.addEventListener( 'mousedown', onDocumentMouseDown );
			document.addEventListener( 'mouseup', onDocumentMouseUp );
			document.addEventListener( 'mousemove', onDocumentMouseMove );
			document.addEventListener( 'touchstart', onDocumentTouchStart );
			document.addEventListener( 'touchend', onDocumentTouchEnd );
			document.addEventListener( 'touchmove', onDocumentTouchMove );

			dispatch( events.start, arguments );
			renderer.setAnimationLoop( animate );
		};

		this.stop = function () {
			if ( renderer.xr.enabled ) vrButton.remove();

			document.removeEventListener( 'keydown', onDocumentKeyDown );
			document.removeEventListener( 'keyup', onDocumentKeyUp );
			document.removeEventListener( 'mousedown', onDocumentMouseDown );
			document.removeEventListener( 'mouseup', onDocumentMouseUp );
			document.removeEventListener( 'mousemove', onDocumentMouseMove );
			document.removeEventListener( 'touchstart', onDocumentTouchStart );
			document.removeEventListener( 'touchend', onDocumentTouchEnd );
			document.removeEventListener( 'touchmove', onDocumentTouchMove );

			dispatch( events.stop, arguments );
			renderer.setAnimationLoop( null );
		};

		this.dispose = function () {
			renderer.dispose();
			camera = undefined;
			scene = undefined;
		};

		//

		function onDocumentKeyDown( event ) {
			dispatch( events.keydown, event );
		}

		function onDocumentKeyUp( event ) {
			dispatch( events.keyup, event );
		}

		function onDocumentMouseDown( event ) {
			dispatch( events.mousedown, event );
		}

		function onDocumentMouseUp( event ) {
			dispatch( events.mouseup, event );
		}

		function onDocumentMouseMove( event ) {
			dispatch( events.mousemove, event );
		}

		function onDocumentTouchStart( event ) {
			dispatch( events.touchstart, event );
		}

		function onDocumentTouchEnd( event ) {
			dispatch( events.touchend, event );
		}

		function onDocumentTouchMove( event ) {
			dispatch( events.touchmove, event );
		}
	}

};

export { iTopo3dExplore };
