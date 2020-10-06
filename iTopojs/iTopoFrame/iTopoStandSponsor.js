import { iTopoOrbitControls } from './iTopoOrbitControls.js';
import { UIPanel } from '../iTopoUI.js';
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';

var iTopoStandSponsor = {

	Explore: function (parentDom) {
		var scope = this;

		var container = new UIPanel();
		container.setPosition( 'absolute' );
		scope.dom = container.dom;
		console.log(parentDom);
		this.width = 78;
		this.height = 78;
		parentDom.appendChild( container.dom );

		var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
		renderer.setPixelRatio( this.width / this.height );
		renderer.setSize( this.width , this.height );
		renderer.setClearColor( '#86c9c9' );
		scope.dom.appendChild( renderer.domElement );

		//renderer.outputEncoding = THREE.sRGBEncoding;
		// var project = json.project;
		// if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
		// if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
		// if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
		// if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
		// if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
		// if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;

		var camera, controls, scene;
		var vrButton = VRButton.createButton( renderer );
		var events = {};
		var onDownPosition = new THREE.Vector2();
		var onUpPosition = new THREE.Vector2();


		this.show3D = function (background_texture, sponsorInfo ) {

			scene = new THREE.Scene();
			scene.background = background_texture;
			this.setScene(scene);

			scene.add(new THREE.AmbientLight(0x0c0c0c));

			let spotLight = new THREE.SpotLight(0xffffff);
			spotLight.position.set(-400, -400, -400);

			let spotLight2 = new THREE.SpotLight(0xffffff);
			spotLight2.position.set(400, 800, 400);

			scene.add(spotLight);
			scene.add(spotLight2);

			var camera = new THREE.PerspectiveCamera(50, this.width/this.height, 1, 5000);
			camera.name = 'Camera';
			camera.position.set( 0, 0, 2000 );
			camera.lookAt(0,0,0);
			this.setCamera(camera);

			controls = new iTopoOrbitControls(camera, renderer.domElement);
			controls.minDistance = 2;
			controls.maxDistance = 600;
			controls.enablePan = true;
			controls.enableZoom = true;
			renderer.domElement.removeAttribute("tabindex");

			// var axes = new THREE.AxesHelper(1000);
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

			this.sponsorInfo = sponsorInfo;

			scope.create2DStandContainer();
		};

		scope.create2DStandContainer = function(){

			var standContainerInfo = {
				radius: 300,
				dividCount: scope.sponsorInfo.length,
				depth: 5,
				segmentsCount: 600,
				height: 150,
			};

			var boxWidth = standContainerInfo.radius*2*Math.PI / standContainerInfo.dividCount * (standContainerInfo.dividCount-1)/standContainerInfo.dividCount;

			var group = new THREE.Group();

			var geometry = new THREE.BoxGeometry(boxWidth, standContainerInfo.height, standContainerInfo.depth, standContainerInfo.segmentsCount, 1);
			//  需要长：280，高300 平分6分，60度，中间有间隙取50度，通过公式，为L=n× π× r/180，L=α× r。其中n是圆心角度数，r是半径，L是圆心角弧长得 r=320,n=50,弧度=280，
			geometry.vertices.forEach(function(item) {
				item.z += Math.sqrt(standContainerInfo.radius*standContainerInfo.radius - item.x * item.x) - standContainerInfo.radius;
			});

			var loader =  new THREE.TextureLoader();

			for( var i= 0; i < standContainerInfo.dividCount; ++i ){
				var imgURL = "./iTopoObjects/"  + scope.sponsorInfo[i].objectUUID + "/myiTopoLogo.jpg";
				console.log(imgURL);

				var textureImg =loader.load(imgURL);
				var xxximg = textureImg.image ;

				var material = new THREE.MeshBasicMaterial({
					map: textureImg,
					side: THREE.FrontSide,//THREE.DoubleSide, //
				});

				var mesh = new THREE.Mesh( geometry,material );
				var x=standContainerInfo.radius*Math.sin(2*Math.PI*i/standContainerInfo.dividCount);
				var y=0;
				var z=standContainerInfo.radius*Math.cos(2*Math.PI*i/standContainerInfo.dividCount);
				mesh.position.set( x, y, z);
				// mesh.rotation.set( 0, 0, 0 );
				// mesh.scale.set( 1, 1, 1 );
				mesh.rotateY(Math.PI*2*i/standContainerInfo.dividCount);
				mesh.userData = scope.sponsorInfo[i];
				scope.scene.add( mesh );
			}
		};

		this.setCamera = function ( value ) {
			camera = value;
			camera.aspect = this.width / this.height;
			camera.updateProjectionMatrix();
		};

		this.setScene = function ( value ) {
			this.scene = value;
		};

		this.addObject = function( object ) {
			this.scene.add(object);
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
			scope.scene.rotation.y += 0.001;
			renderer.setViewport( 0, 0, renderer.domElement.offsetWidth, renderer.domElement.offsetHeight );
			renderer.render( scope.scene, camera );
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

		this.clearScene= function ( scene ) {
			var scope = this;
			if (!scene) return;
			// 删除掉所有的模型组内的mesh
			scene.traverse(function(item) {
				if (item instanceof THREE.Mesh) {
					item.geometry.dispose(); // 删除几何体
					if (Array.isArray(item.material))
						item.material.length = 0;
					else
						item.material.dispose(); // 删除材质
				}
			});
		};

		this.dispose = function () {
			this.clearScene(scope.scene);
			renderer.dispose();
			camera = undefined;
			scope.scene = undefined;
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
			var interObjs = raycaster.intersectObjects( scene.children );

			return interObjs;
		}

		function handleClick() {

			if( onUpPosition.x > 1.0 || onUpPosition.y > 1.0)
				return;

			if ( onDownPosition.distanceTo( onUpPosition ) === 0 ) {
				var intersects = getIntersects( onUpPosition, scope.objects);

				if ( intersects.length > 0 ) {
					var object = intersects[ 0 ].object;
					editor.signals.locateiTopoObject.dispatch(object.userData);
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

			var array = getMousePosition( renderer.domElement, event.clientX, event.clientY );
			onDownPosition.fromArray( array );

			dispatch( events.mousedown, event );
		}

		function onDocumentMouseUp( event ) {

			var array = getMousePosition( renderer.domElement, event.clientX, event.clientY );
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

export { iTopoStandSponsor };
