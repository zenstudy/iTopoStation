import { CSS3DRenderer, CSS3DObject } from '../../../examples/jsm/renderers/CSS3DRenderer.js';
import { TWEEN } from '../../../examples/jsm/libs/tween.module.min.js';
import { UIPanel } from '../iTopoUI.js';
import { iTopoOrbitControls } from './iTopoOrbitControls.js';

var iTopoTask3dExplore = {

	Explore: function (displayStand) {
		var scope = this;
		this.objects = [];
		this.targets = { random: [], table: [], sphere: [], helix: [], grid: [] };

		var renderer = new CSS3DRenderer();
		var glRenderer = new THREE.WebGLRenderer( { antialias: true } );
		//glRenderer.setPixelRatio( window.devicePixelRatio );
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
		var camera, scene, glScene, orbitControls;
	//	var vrButton = VRButton.createButton( renderer );
		var events = {};
		var onDownPosition = new THREE.Vector2();
		var onUpPosition = new THREE.Vector2();

		var container = new UIPanel();
		container.setPosition( 'absolute' );

		displayStand.container.dom.appendChild( container.dom );
		scope.dom = container.dom;

		glRenderer.domElement.id = 'taskView';
		scope.dom.appendChild( glRenderer.domElement );
		//renderer.domElement.id = 'taskView';
		scope.dom.appendChild( renderer.domElement );


		scope.width = 500;
		scope.height = 500;

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

			orbitControls = new iTopoOrbitControls(camera, renderer.domElement);
			orbitControls.maxPolarAngle = Math.PI * 0.5;
			orbitControls.minDistance = 10;
			orbitControls.maxDistance = 6000;
			orbitControls.enablePan = true;
			orbitControls.enableZoom = true;
			orbitControls.enabled = true;
			orbitControls.update();
			renderer.domElement.removeAttribute("tabindex");

			// var axes = new THREE.AxesHelper(2072);
			// scene.add(axes);

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

			this.createTaskMenu();
			this.createLayoutMenu();

			this.generateTaskLayouts();
			this.transformWithOutAnimate( this.targets.helix, 2000 );
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
					opacity: .01,
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

		this.createTaskMenu = function(){
			var scope = this;
			var css3dMenu = document.createElement( 'div' );
			css3dMenu.id = 'TaskViewTopMenu';

			var tableButton = document.createElement( 'input' );
			tableButton.type="button";
			tableButton.value = editor.strings.getKey( 'iTopoTask3dExplore/TaskViewTopMenu/AddTask' );
			tableButton.addEventListener('click', function(){
				var taskObject = {
					objectUUID : editor.selected.userData.objectUUID,
					taskUUID:THREE.MathUtils.generateUUID(),
					taskTitle:'任务标题',
					taskCreatedby:'任务创建者',
					taskStatus:'待办',
					taskDescription:'关于此任务的详细描述',
				};
				scope.unshiftCardItem(taskObject);
				scope.generateTaskLayouts();
				scope.transformWithOutAnimate( scope.targets.helix, 2000 );

				scope.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight()-500);

				editor.stationDB.addTask(JSON.stringify(taskObject), function(){
					editor.signals.taskCardSelected.dispatch(scope.objects[0]);
				});

			} );
			css3dMenu.appendChild( tableButton );

			var sphereButton = document.createElement( 'input' );
			sphereButton.type="button";
			sphereButton.value = editor.strings.getKey( 'iTopoTask3dExplore/TaskViewTopMenu/DeleteTask' );
			sphereButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.sphere,2000 ); } );
			css3dMenu.appendChild( sphereButton );

			scope.dom.appendChild(css3dMenu);
		};

		this.createLayoutMenu = function(){
			var scope =this;
			var css3dMenu = document.createElement( 'div' );
			css3dMenu.id = 'TaskViewBottomMenu';

			var tableButton = document.createElement( 'input' );
			tableButton.type="button";
			tableButton.value = editor.strings.getKey('iTopoTask3dExplore/TaskViewBottomMenu/Table');
			tableButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.table,2000 ); } );
			css3dMenu.appendChild( tableButton );

			var sphereButton = document.createElement( 'input' );
			sphereButton.type="button";
			sphereButton.value = editor.strings.getKey('iTopoTask3dExplore/TaskViewBottomMenu/Sphere');
			sphereButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.sphere,2000 ); } );
			css3dMenu.appendChild( sphereButton );

			var helixButton = document.createElement( 'input' );
			helixButton.type="button";
			helixButton.value = editor.strings.getKey('iTopoTask3dExplore/TaskViewBottomMenu/Helix');
			helixButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.helix,2000 ); } );
			css3dMenu.appendChild( helixButton );

			var gridButton = document.createElement( 'input' );
			gridButton.type="button";
			gridButton.value = editor.strings.getKey('iTopoTask3dExplore/TaskViewBottomMenu/Grid');
			gridButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.grid,2000 ); } );
			css3dMenu.appendChild( gridButton );

			var randomButton = document.createElement( 'input' );
			randomButton.type="button";
			randomButton.value = editor.strings.getKey('iTopoTask3dExplore/TaskViewBottomMenu/random');
			randomButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.random,2000 ); } );
			css3dMenu.appendChild( randomButton );

			scope.dom.appendChild(css3dMenu);
		};

		this.createObject = function(taskObject) {
			var element = document.createElement( 'div' );
			element.className = 'TaskCard';
			element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

			var taskStatus = document.createElement( 'div' );
			taskStatus.className = 'TaskStatus';
			taskStatus.textContent = taskObject.taskStatus;
			element.appendChild( taskStatus );

			var taskDetail = document.createElement( 'div' );
			taskDetail.className = 'TaskDetail';
			taskDetail.textContent = taskObject.taskDescription;
			element.appendChild( taskDetail );

			var taskCreatedBy = document.createElement( 'div' );
			taskCreatedBy.className = 'TaskCreatedBy';
			taskCreatedBy.innerHTML =  taskObject.taskCreatedby;
			element.appendChild( taskCreatedBy );

			var object = new CSS3DObject( element );
			object.position.x = 0;
			object.position.y = 0;
			object.position.z = 0;
			object.userData = { objectUUID : taskObject.objectUUID , taskUUID: taskObject.taskUUID };

			return object;
		};

		this.unshiftCardItem = function (taskObject){
			var object = this.createObject(taskObject);
			scene.add( object );
			this.objects.unshift( object );
		};

		this.appendCardItem = function (taskObject){
			var object = this.createObject(taskObject);
			scene.add( object );
			this.objects.push( object );
		};

		this.generateTaskLayouts = function(){
			this.createRandonFormation();
			this.createTableFormation();
			this.createSphereFormation();
			this.createHelixFormation();
			this.createGridFormation();
		};

		this.createRandonFormation = function(){
			var columnCount = 10;
			this.targets.random.length = 0;
			var vector = new THREE.Vector3();
			for ( var i = 0, l = this.objects.length; i < l; i ++ ) {
				var object = new THREE.Object3D();
				object.position.x = Math.random() * 4000 - 2000;
				object.position.y = Math.random() * 4000 - 2000;
				object.position.z = Math.random() * 4000 - 2000;
				this.targets.random.push( object );
			}
		};

		this.createTableFormation = function(){
			var columnCount = 10;
			this.targets.table.length = 0;
			var vector = new THREE.Vector3();
			for ( var i = 0, l = this.objects.length; i < l; i ++ ) {
				var object = new THREE.Object3D();
				object.position.x = ( ( i % columnCount) * 140 ) - columnCount*140/2;
				object.position.y = - ( parseInt( i / columnCount) * 180 ) + 990;
				this.targets.table.push( object );
			}
		};

		this.createSphereFormation = function(){
			this.targets.sphere.length = 0;
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
			this.targets.helix.length = 0;
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
			this.targets.grid.length = 0;
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

			scope.dom.style.width = width + 'px';
			scope.dom.style.height = height + 'px';

			if ( camera ) {
				camera.aspect = this.width / this.height;
				camera.updateProjectionMatrix();
			}

			if ( renderer ) {
				renderer.setSize( width, height );
				glRenderer.setSize( width, height );
				glRenderer.setPixelRatio(  width/ height );
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

			if(requestAnimate !== true)
				return;

			console.log('iTopoTask3dExplore.animate');

			orbitControls.update();

			//TWEEN.update();

			renderer.render( scene, camera );
			glRenderer.render( glScene, camera );
			glRenderer.setViewport( 0, 0, glRenderer.domElement.offsetWidth, glRenderer.domElement.offsetHeight );

			prevTime = time;

			requestAnimationFrame(animate);
		}

		this.play = function () {
			//if ( renderer.xr.enabled ) dom.append( vrButton );
			prevTime = performance.now();
			var domX =  orbitControls.domElement;
			console.log(orbitControls.domElement);

			domX.addEventListener( 'keydown', onDocumentKeyDown );
			domX.addEventListener( 'keyup', onDocumentKeyUp );
			domX.addEventListener( 'mousedown', onDocumentMouseDown );
			domX.addEventListener( 'mouseup', onDocumentMouseUp );
			domX.addEventListener( 'mousemove', onDocumentMouseMove );
			domX.addEventListener( 'touchstart', onDocumentTouchStart );
			domX.addEventListener( 'touchend', onDocumentTouchEnd );
			domX.addEventListener( 'touchmove', onDocumentTouchMove );

			dispatch( events.start, arguments );
			//renderer.setAnimationLoop( animate ); //CSS3DRenderer没有setAnimationLoop功能

			requestAnimate = true;
			animate ();
		};

		this.stop = function () {
			//if ( renderer.xr.enabled ) vrButton.remove();
			var domX =  orbitControls.domElement/*displayStand.container.dom*/;
			console.log('glRenderer.domElement');
			domX.removeEventListener( 'keydown', onDocumentKeyDown );
			domX.removeEventListener( 'keyup', onDocumentKeyUp );
			domX.removeEventListener( 'mousedown', onDocumentMouseDown );
			domX.removeEventListener( 'mouseup', onDocumentMouseUp );
			domX.removeEventListener( 'mousemove', onDocumentMouseMove );
			domX.removeEventListener( 'touchstart', onDocumentTouchStart );
			domX.removeEventListener( 'touchend', onDocumentTouchEnd );
			domX.removeEventListener( 'touchmove', onDocumentTouchMove );

			dispatch( events.stop, arguments );
			requestAnimate = false;
			//renderer.setAnimationLoop( null );
		};

		this.dispose = function () {
			//console.log(renderer);
			//renderer.dispose();
			this.stop();
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
				var intersects = getIntersects( onUpPosition, scope.objects);

				if ( intersects.length > 0 ) {
					var object = intersects[ 0 ].object;
					console.log(object.userData);
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

		return scope;
	}
};

export { iTopoTask3dExplore };
