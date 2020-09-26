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

			controls = new OrbitControls(camera, renderer.domElement);
			controls.minDistance = 2;
			controls.maxDistance = 500;
			controls.enablePan = true;
			controls.enableZoom = true;
			renderer.domElement.removeAttribute("tabindex");

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
	}
};

export { iTopo3dExplore };
