import { iTopoOrbitControls } from './iTopoOrbitControls.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { UIPanel } from '../iTopoUI.js';
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';

var iTopoStandPlatform = {

	Explore: function (title) {
		var scope = this;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		//displayStand.container.setPosition('absolate');

		this.width = displayStand.container.dom.offsetWidth;
		this.height = displayStand.contexHeight();

		displayStand.container.dom.addEventListener( 'resize', function () {
		 	scope.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight() );
		} );

		displayStand.closeBtn.dom.addEventListener('click', function() {
			scope.stop();
			scope.dispose();
			scope = null;
		});

		var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
		renderer.setPixelRatio( this.width / this.height );
		renderer.setSize( this.width , this.height );
		//renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.setClearColor( '#86c9c9' );

		// var project = json.project;
		// if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
		// if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
		// if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
		// if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
		// if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
		// if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;

		var camera, controls;
		var vrButton = VRButton.createButton( renderer );
		var events = {};

		var container = new UIPanel();
		container.setPosition( 'absolute' );

		displayStand.container.dom.appendChild( container.dom );
		scope.dom = container.dom;
		scope.dom.appendChild( renderer.domElement );

		scope.create2DStandContainer = function(){

			var standContainerInfo = {
				radius: 300,
				dividCount: scope.jsonProductInfo.Album2DImgs.length,
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

			for( var i= 0; i < standContainerInfo.dividCount; ++i){
				var imgURL = "./iTopoObjects/E7411AF8-DD5B-4863-895A-C1DF80098B7C/Products/" 
				+ scope.jsonProductInfo.productUUID + "/" + scope.jsonProductInfo.Album2DImgs[i].productImgUUID +	".jpg";
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
				group.add( mesh );
			}
			scope.standContainer2D = group;
			scope.scene.add( group );
		}

		this.show3D = function (background_texture, object, jsonProductInfo ) {

			var scene = new THREE.Scene();
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
			controls.maxDistance = 1200;
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

			scope.createTopMenu();
			scope.createBottomMenu();
			scope.createLeftMenu();
			scope.createRightMenu();

			this.productModel = object;
			this.jsonProductInfo = jsonProductInfo;

			scope.create2DStandContainer();
		};

		this.createTopMenu = function(){
			var scope = this;
			var css3dMenu = document.createElement( 'div' );
			css3dMenu.id = 'TaskViewTopMenu';

			var tableButton = document.createElement( 'input' );
			tableButton.type="button";
			tableButton.value = editor.strings.getKey( 'iTopoStandPlatform/TaskViewTopMenu/2DAlbum' );
			tableButton.addEventListener('click', function()
			{
				if(scope.productModel !== null || scope.productModel !== undefined){
					scope.scene.remove(scope.standContainer2D);
					scope.scene.remove(scope.productModel);
					scope.create2DStandContainer();
				}
			} );
			css3dMenu.appendChild( tableButton );

			var sphereButton = document.createElement( 'input' );
			sphereButton.type="button";
			sphereButton.value = editor.strings.getKey( 'iTopoStandPlatform/TaskViewTopMenu/3DModel' );
			sphereButton.addEventListener('click', function(){
				scope.scene.remove(scope.standContainer2D);
				scope.scene.remove(scope.productModel);
				scope.addObject(scope.productModel);
			} );
			css3dMenu.appendChild( sphereButton );

			scope.dom.appendChild(css3dMenu);
		};

		this.createBottomMenu = function(){
			var scope =this;
			var css3dMenu = document.createElement( 'div' );
			css3dMenu.id = 'TaskViewBottomMenu';

			var tableButton = document.createElement( 'input' );
			tableButton.type="button";
			tableButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			tableButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.table,2000 ); } );
			css3dMenu.appendChild( tableButton );

			var helixButton = document.createElement( 'input' );
			helixButton.type="button";
			helixButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			helixButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.helix,2000 ); } );
			css3dMenu.appendChild( helixButton );

			var sphereButton = document.createElement( 'input' );
			sphereButton.type="button";
			sphereButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			sphereButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.sphere,2000 ); } );
			css3dMenu.appendChild( sphereButton );

			var gridButton = document.createElement( 'input' );
			gridButton.type="button";
			gridButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			gridButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.grid,2000 ); } );
			css3dMenu.appendChild( gridButton );

			var randomButton = document.createElement( 'input' );
			randomButton.type="button";
			randomButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			randomButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.random,2000 ); } );
			css3dMenu.appendChild( randomButton );

			scope.dom.appendChild(css3dMenu);
		};

		this.createLeftMenu = function(){
			var scope =this;
			var css3dMenu = document.createElement( 'div' );
			css3dMenu.id = 'TaskViewLeftMenu';

			var tableButton = document.createElement( 'input' );
			tableButton.type="button";
			tableButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			tableButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.table,2000 ); } );
			css3dMenu.appendChild( tableButton );

			var helixButton = document.createElement( 'input' );
			helixButton.type="button";
			helixButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			helixButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.helix,2000 ); } );
			css3dMenu.appendChild( helixButton );

			var sphereButton = document.createElement( 'input' );
			sphereButton.type="button";
			sphereButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			sphereButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.sphere,2000 ); } );
			css3dMenu.appendChild( sphereButton );

			var gridButton = document.createElement( 'input' );
			gridButton.type="button";
			gridButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			gridButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.grid,2000 ); } );
			css3dMenu.appendChild( gridButton );

			var randomButton = document.createElement( 'input' );
			randomButton.type="button";
			randomButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			randomButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.random,2000 ); } );
			css3dMenu.appendChild( randomButton );

			scope.dom.appendChild(css3dMenu);
		};

		this.createRightMenu = function(){
			var scope =this;
			var css3dMenu = document.createElement( 'div' );
			css3dMenu.id = 'TaskViewRightMenu';

			var tableButton = document.createElement( 'input' );
			tableButton.type="button";
			tableButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			tableButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.table,2000 ); } );
			css3dMenu.appendChild( tableButton );

			var helixButton = document.createElement( 'input' );
			helixButton.type="button";
			helixButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			helixButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.helix,2000 ); } );
			css3dMenu.appendChild( helixButton );

			var sphereButton = document.createElement( 'input' );
			sphereButton.type="button";
			sphereButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			sphereButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.sphere,2000 ); } );
			css3dMenu.appendChild( sphereButton );

			var gridButton = document.createElement( 'input' );
			gridButton.type="button";
			gridButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			gridButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.grid,2000 ); } );
			css3dMenu.appendChild( gridButton );

			var randomButton = document.createElement( 'input' );
			randomButton.type="button";
			randomButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			randomButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.random,2000 ); } );
			css3dMenu.appendChild( randomButton );

			scope.dom.appendChild(css3dMenu);
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

export { iTopoStandPlatform };
