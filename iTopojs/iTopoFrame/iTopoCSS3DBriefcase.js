import { TransformControls } from '../../../examples/jsm/controls/TransformControls.js';
import { TrackballControls } from '../../../examples/jsm/controls/TrackballControls.js';
import { OrbitControls } from '../../../examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from '../../../examples/jsm/renderers/CSS3DRenderer.js';
import { TWEEN } from '../../../examples/jsm/libs/tween.module.min.js';

var iTopoCSS3DBriefcase = {

	Explore: function (displayStand) {
		var scope = this;
		this.objects = [];
		this.targets = { table: [], sphere: [], helix: [], grid: [] };
	//	var exploreContainerDom = parentContainerDom;
	//	console.log(parentContainerDom);

		var renderer = new CSS3DRenderer();
		var glRenderer = new THREE.WebGLRenderer( { antialias: true } );
		glRenderer.setPixelRatio( window.devicePixelRatio );
		glRenderer.setClearColor( '#86c9c9' );
		// //renderer.outputEncoding = THREE.sRGBEncoding;

		// var project = json.project;
		// if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
		// if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
		// if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
		// if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
		// if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
		// if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;

		var requestAnimate = true;
		var camera, scene, glScene, controls, glControls;
		var vrButton = VRButton.createButton( renderer );
		var events = {};
		var onDownPosition = new THREE.Vector2();
		var onUpPosition = new THREE.Vector2();

		var dom = document.createElement( 'div' );
		//dom.style.background = '#86c9c9';
		//dom.style.position = 'absolate';

		//glRenderer.domElement.style.top = '0px';
		dom.appendChild( glRenderer.domElement );
		glRenderer.domElement.id = 'taskView';
		// renderer.domElement.style.position = 'absolate';
		dom.appendChild( renderer.domElement );

		scope.dom = dom;

		this.width = 500;
		this.height = 500;

		this.initialize = function ( ) {
			scene = new THREE.Scene();
			//this.setScene(scene);
			glScene = new THREE.Scene();

			scene.add(new THREE.AmbientLight(0x0c0c0c));

			let spotLight = new THREE.SpotLight(0xffffff);
			spotLight.position.set(-400, -400, -400);

			let spotLight2 = new THREE.SpotLight(0xffffff);
			spotLight2.position.set(400, 800, 400);

			scene.add(spotLight);
			scene.add(spotLight2);

			var camera = new THREE.PerspectiveCamera(75, renderer.domElement.innerWidth/renderer.domElement.innerHeight, 1, 10000);
			camera.name = 'Camera';
			camera.position.set( 0, 0, 2000 );
			camera.lookAt(0,0,0);
			this.setCamera(camera);

			// controls = new TrackballControls( camera, renderer.domElement );
			// controls.minDistance = 500;
			// controls.maxDistance = 6000;
			// controls.addEventListener( 'change', animate );

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
			controls.minDistance = 10;
			controls.maxDistance = 6000;
			controls.enablePan = true;
			controls.enableZoom = true;


			glControls = new OrbitControls(camera, glRenderer.domElement);
			glControls.minDistance = 10;
			glControls.maxDistance = 6000;
			glControls.enablePan = true;
			glControls.enableZoom = true;

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

		this.show3D = function ( ) {
			this.generateTaskLayouts();
			this.createCSS3DMenu();
			this.transformWithOutAnimate( this.targets.sphere, 2000 );
		};

		this.transformWithOutAnimate = function( targets ) {

			for ( var i = 0; i < this.objects.length; i ++ ) {

				var object = this.objects[ i ];
				var target = targets[ i ];

				object.position.copy(target.position);
				object.rotation.copy(target.rotation);
			}

			glScene.children.length = 0;
			this.objects.forEach(function(object){

				let geometry = new THREE.PlaneGeometry(120,160);

				let material = new THREE.MeshBasicMaterial({
					color:0x00ff00,
					side: THREE.DoubleSide,
					opacity: 0.01,
					blending: THREE.AdditiveBlending,
					transparent: true,
					depthTest: false
				});


				let box = new THREE.Mesh(geometry,material);
				box.position.copy(object.position);
				box.rotation.copy(object.rotation);
				box.userData = object.userData;
				glScene.add(box);
			});
		};

		this.transformWithAnimate = function( targets, duration ) {

			TWEEN.removeAll();

			for ( var i = 0; i < this.objects.length; i ++ ) {

				var object = this.objects[ i ];
				var target = targets[ i ];

				new TWEEN.Tween( object.position )
					.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
					.easing( TWEEN.Easing.Exponential.InOut )
					.start();

				new TWEEN.Tween( object.rotation )
					.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
					.easing( TWEEN.Easing.Exponential.InOut )
					.start();

			}

			new TWEEN.Tween( this )
				.to( {}, duration * 2 )
				.onUpdate( animate )
				.start();

		};

		this.createCSS3DMenu = function(){
			var scope =this;

			var css3dMenu = document.createElement( 'div' );
			css3dMenu.id = 'CSS3DMenu';

			var tableButton = document.createElement( 'input' );
			tableButton.type="button";
			tableButton.value = 'Table';
			tableButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.table,2000 ); } );
			css3dMenu.appendChild( tableButton );

			var sphereButton = document.createElement( 'input' );
			sphereButton.type="button";
			sphereButton.value = 'Sphere';
			sphereButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.sphere,2000 ); } );
			css3dMenu.appendChild( sphereButton );

			var helixButton = document.createElement( 'input' );
			helixButton.type="button";
			helixButton.value = 'Helix';
			helixButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.helix,2000 ); } );
			css3dMenu.appendChild( helixButton );

			var gridButton = document.createElement( 'input' );
			gridButton.type="button";
			gridButton.value = 'Grid';
			gridButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.grid,2000 ); } );
			css3dMenu.appendChild( gridButton );

			scope.dom.appendChild(css3dMenu);
		};

		this.generateTaskLayouts = function(){
			this.createSphereFormation();
			this.createHelixFormation();
			this.createGridFormation();
		};

		this.createTaskCardItem = function (taskObject){

			var element = document.createElement( 'div' );
			element.className = 'CSS3DElement';
			element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

			var number = document.createElement( 'div' );
			number.className = 'number';
			number.textContent = taskObject.taskStatus;
			element.appendChild( number );

			var symbol = document.createElement( 'div' );
			symbol.className = 'symbol';
			symbol.textContent = taskObject.taskDetail;
			element.appendChild( symbol );

			var details = document.createElement( 'div' );
			details.className = 'details';
			details.innerHTML =  taskObject.taskCreateBy;
			element.appendChild( details );

			var object = new CSS3DObject( element );
			object.position.x = Math.random() * 4000 - 2000;
			object.position.y = Math.random() * 4000 - 2000;
			object.position.z = Math.random() * 4000 - 2000;
			object.userData = { TaskType : symbol.textContent, TaskUUID: details.innerHTML };
			scene.add( object );

			this.objects.push( object );
			//
			var columnCount = 10;
			var object = new THREE.Object3D();
			object.position.x = ( (this.objects.length % columnCount) * 140 ) - 1330;
			object.position.y = - ( parseInt( this.objects.length / columnCount) * 180 ) + 990;

			this.targets.table.push( object );
		};

		this.createSphereFormation = function(){
			// sphere
			var vector = new THREE.Vector3();

			for ( var i = 0, l = this.objects.length; i < l; i ++ ) {

				var phi = Math.acos( - 1 + ( 2 * i ) / l );
				var theta = Math.sqrt( l * Math.PI ) * phi;

				var object = new THREE.Object3D();

				object.position.setFromSphericalCoords( 800, phi, theta );

				vector.copy( object.position ).multiplyScalar( 2 );

				object.lookAt( vector );

				this.targets.sphere.push( object );
			}
		};

		this.createHelixFormation = function(){
			// helix

			var vector = new THREE.Vector3();

			for ( var i = 0, l = this.objects.length; i < l; i ++ ) {

				var theta = i * 0.175 + Math.PI;
				var y = - ( i * 8 ) + 450;

				var object = new THREE.Object3D();

				object.position.setFromCylindricalCoords( 900, theta, y );

				vector.x = object.position.x * 2;
				vector.y = object.position.y;
				vector.z = object.position.z * 2;

				object.lookAt( vector );

				this.targets.helix.push( object );

			}
		};

		this.createGridFormation = function(){
			// grid
				for ( var i = 0; i < this.objects.length; i ++ ) {

					var object = new THREE.Object3D();

					object.position.x = ( ( i % 5 ) * 400 ) - 800;
					object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
					object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

					this.targets.grid.push( object );
				}
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
				glRenderer.setSize( width, height );
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

	//		console.log('iTopoCSS3DBriefcase animate..........');

			if(requestAnimate !== true)
				return;

			controls.update();
			glControls.update();
			//TWEEN.update();

			renderer.render( scene, camera );
			glRenderer.render( glScene, camera );

			prevTime = time;

			requestAnimationFrame(animate);
		}

		this.play = function () {
			//if ( renderer.xr.enabled ) dom.append( vrButton );
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
			//renderer.setAnimationLoop( animate ); //CSS3DRenderer没有setAnimationLoop功能

			requestAnimate = true;
			animate ();
		};

		this.stop = function () {
			//if ( renderer.xr.enabled ) vrButton.remove();

			document.removeEventListener( 'keydown', onDocumentKeyDown );
			document.removeEventListener( 'keyup', onDocumentKeyUp );
			document.removeEventListener( 'mousedown', onDocumentMouseDown );
			document.removeEventListener( 'mouseup', onDocumentMouseUp );
			document.removeEventListener( 'mousemove', onDocumentMouseMove );
			document.removeEventListener( 'touchstart', onDocumentTouchStart );
			document.removeEventListener( 'touchend', onDocumentTouchEnd );
			document.removeEventListener( 'touchmove', onDocumentTouchMove );

			dispatch( events.stop, arguments );
			requestAnimate = false;
			//renderer.setAnimationLoop( null );
		};

		this.dispose = function () {
			//console.log(renderer);
			//renderer.dispose();
			requestAnimate = false;
			renderer = null;
			camera = undefined;
			scene = undefined;
		};

		//
		function getMousePosition( dom, x, y ) {
			var rect = dom.getBoundingClientRect();
			return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];
		}

		var raycaster = new THREE.Raycaster();
		var mouse = new THREE.Vector2();

		function getIntersects( point, objects ) {

			mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );
			raycaster.setFromCamera( mouse, camera );
			var interObjs = raycaster.intersectObjects( glScene.children );

			return interObjs;
		}

		function handleClick() {
			if( onUpPosition.x > 1.0 || onUpPosition.y > 1.0)
				return;

			if ( onDownPosition.distanceTo( onUpPosition ) === 0 ) {
				var intersects = getIntersects( onUpPosition, scope.objects /*scope.targets.sphere*/ );
				if ( intersects.length > 0 ) {
					var object = intersects[ 0 ].object;
					scope.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight()-500);
					editor.signals.taskCardSelected.dispatch(object);
				} else {
					scope.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight());
					editor.signals.taskCardSelected.dispatch(null);
				}
			}
		}

		function onDocumentKeyDown( event ) {
			dispatch( events.keydown, event );
		}

		function onDocumentKeyUp( event ) {
			dispatch( events.keyup, event );
		}

		function onDocumentMouseDown( event ) {
			var array = getMousePosition( glRenderer.domElement, event.clientX, event.clientY );
			onDownPosition.fromArray( array );

			dispatch( events.mousedown, event );
		}

		function onDocumentMouseUp( event ) {
			var array = getMousePosition( glRenderer.domElement, event.clientX, event.clientY );
			onUpPosition.fromArray( array );

			handleClick();
			//document.removeEventListener( 'mouseup', onMouseUp, false );
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

export { iTopoCSS3DBriefcase };
