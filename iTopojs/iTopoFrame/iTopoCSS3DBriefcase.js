import { TransformControls } from '../../../examples/jsm/controls/TransformControls.js';
import { TrackballControls } from '../../../examples/jsm/controls/TrackballControls.js';
import { OrbitControls } from '../../../examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from '../../../examples/jsm/renderers/CSS3DRenderer.js';
import { TWEEN } from '../../../examples/jsm/libs/tween.module.min.js';

var iTopoCSS3DBriefcase = {

	Explore: function () {

		this.objects = [];
		this.targets = { table: [], sphere: [], helix: [], grid: [] };

		var renderer = new CSS3DRenderer();
		//var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
		// renderer.setPixelRatio( window.devicePixelRatio );
		// //renderer.outputEncoding = THREE.sRGBEncoding;

		// var project = json.project;
		// if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
		// if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
		// if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
		// if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
		// if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
		// if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;

		var requestAnimate = true;
		var camera, scene, controls;
		var vrButton = VRButton.createButton( renderer );
		var events = {};

		var dom = document.createElement( 'div' );
		dom.style.background = '#86c9c9';
		dom.appendChild( renderer.domElement );
		this.dom = dom;

		this.width = 500;
		this.height = 500;

		this.show3D = function ( ) {

			var scene = new THREE.Scene();
			this.setScene(scene);

			this.createCSS3DObjects();
			this.createCSS3DMenu();

			this.transformWithOutAnimate( this.targets.sphere, 2000 );

			scene.add(new THREE.AmbientLight(0x0c0c0c));

			let spotLight = new THREE.SpotLight(0xffffff);
			spotLight.position.set(-400, -400, -400);

			let spotLight2 = new THREE.SpotLight(0xffffff);
			spotLight2.position.set(400, 800, 400);

			scene.add(spotLight);
			scene.add(spotLight2);

			var camera = new THREE.PerspectiveCamera(75, renderer.domElement.innerWidth/renderer.domElement.innerHeight, 1, 10000);
			camera.name = 'Camera';
			camera.position.set( 0, 0, 3000 );
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
			controls.minDistance = 500;
			controls.maxDistance = 6000;
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

		this.transformWithOutAnimate = function( targets ) {
			console.log('transformWithOutAnimate');
			for ( var i = 0; i < this.objects.length; i ++ ) {

				var object = this.objects[ i ];
				var target = targets[ i ];

				object.position.copy(target.position);
				object.rotation.copy(target.rotation);
			}
		};

		this.transform = function( targets, duration ) {

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
			tableButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.table ); } );
			css3dMenu.appendChild( tableButton );

			var sphereButton = document.createElement( 'input' );
			sphereButton.type="button";
			sphereButton.value = 'Sphere';
			sphereButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.sphere ); } );
			css3dMenu.appendChild( sphereButton );

			var helixButton = document.createElement( 'input' );
			helixButton.type="button";
			helixButton.value = 'Helix';
			helixButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.helix ); } );
			css3dMenu.appendChild( helixButton );

			var gridButton = document.createElement( 'input' );
			gridButton.type="button";
			gridButton.value = 'Grid';
			gridButton.addEventListener('click', function(){ scope.transformWithOutAnimate( scope.targets.grid ); } );
			css3dMenu.appendChild( gridButton );

			scope.dom.appendChild(css3dMenu);
		};

		this.createCSS3DObjects = function(){

			var table = [
				"H", "Hydrogen", "1.00794", 1, 1,
				"He", "Helium", "4.002602", 18, 1,
				"Li", "Lithium", "6.941", 1, 2,
				"Be", "Beryllium", "9.012182", 2, 2,
				"B", "Boron", "10.811", 13, 2,
				"C", "Carbon", "12.0107", 14, 2,
				"N", "Nitrogen", "14.0067", 15, 2,
				"O", "Oxygen", "15.9994", 16, 2,
				"F", "Fluorine", "18.9984032", 17, 2,
				"Ne", "Neon", "20.1797", 18, 2,
				"Na", "Sodium", "22.98976...", 1, 3,
				"Mg", "Magnesium", "24.305", 2, 3,
				"Al", "Aluminium", "26.9815386", 13, 3,
				"Si", "Silicon", "28.0855", 14, 3,
				"P", "Phosphorus", "30.973762", 15, 3,
				"S", "Sulfur", "32.065", 16, 3,
				"Cl", "Chlorine", "35.453", 17, 3,
				"Ar", "Argon", "39.948", 18, 3,
				"K", "Potassium", "39.948", 1, 4,
				"Ca", "Calcium", "40.078", 2, 4,
				"Sc", "Scandium", "44.955912", 3, 4,
				"Ti", "Titanium", "47.867", 4, 4,
				"V", "Vanadium", "50.9415", 5, 4,
				"Cr", "Chromium", "51.9961", 6, 4,
				"Mn", "Manganese", "54.938045", 7, 4,
				"Fe", "Iron", "55.845", 8, 4,
				"Co", "Cobalt", "58.933195", 9, 4,
				"Ni", "Nickel", "58.6934", 10, 4,
				"Cu", "Copper", "63.546", 11, 4,
				"Zn", "Zinc", "65.38", 12, 4,
				"Ga", "Gallium", "69.723", 13, 4,
				"Ge", "Germanium", "72.63", 14, 4,
				"As", "Arsenic", "74.9216", 15, 4,
				"Se", "Selenium", "78.96", 16, 4,
				"Br", "Bromine", "79.904", 17, 4,
				"Kr", "Krypton", "83.798", 18, 4,
				"Rb", "Rubidium", "85.4678", 1, 5,
				"Sr", "Strontium", "87.62", 2, 5,
				"Y", "Yttrium", "88.90585", 3, 5,
				"Zr", "Zirconium", "91.224", 4, 5,
				"Nb", "Niobium", "92.90628", 5, 5,
				"Mo", "Molybdenum", "95.96", 6, 5,
				"Tc", "Technetium", "(98)", 7, 5,
				"Ru", "Ruthenium", "101.07", 8, 5,
				"Rh", "Rhodium", "102.9055", 9, 5,
				"Pd", "Palladium", "106.42", 10, 5,
				"Ag", "Silver", "107.8682", 11, 5,
				"Cd", "Cadmium", "112.411", 12, 5,
				"In", "Indium", "114.818", 13, 5,
				"Sn", "Tin", "118.71", 14, 5,
				"Sb", "Antimony", "121.76", 15, 5,
				"Te", "Tellurium", "127.6", 16, 5,
				"I", "Iodine", "126.90447", 17, 5,
				"Xe", "Xenon", "131.293", 18, 5,
				"Cs", "Caesium", "132.9054", 1, 6,
				"Ba", "Barium", "132.9054", 2, 6,
				"La", "Lanthanum", "138.90547", 4, 9,
				"Ce", "Cerium", "140.116", 5, 9,
				"Pr", "Praseodymium", "140.90765", 6, 9,
				"Nd", "Neodymium", "144.242", 7, 9,
				"Pm", "Promethium", "(145)", 8, 9,
				"Sm", "Samarium", "150.36", 9, 9,
				"Eu", "Europium", "151.964", 10, 9,
				"Gd", "Gadolinium", "157.25", 11, 9,
				"Tb", "Terbium", "158.92535", 12, 9,
				"Dy", "Dysprosium", "162.5", 13, 9,
				"Ho", "Holmium", "164.93032", 14, 9,
				"Er", "Erbium", "167.259", 15, 9,
				"Tm", "Thulium", "168.93421", 16, 9,
				"Yb", "Ytterbium", "173.054", 17, 9,
				"Lu", "Lutetium", "174.9668", 18, 9,
				"Hf", "Hafnium", "178.49", 4, 6,
				"Ta", "Tantalum", "180.94788", 5, 6,
				"W", "Tungsten", "183.84", 6, 6,
				"Re", "Rhenium", "186.207", 7, 6,
				"Os", "Osmium", "190.23", 8, 6,
				"Ir", "Iridium", "192.217", 9, 6,
				"Pt", "Platinum", "195.084", 10, 6,
				"Au", "Gold", "196.966569", 11, 6,
				"Hg", "Mercury", "200.59", 12, 6,
				"Tl", "Thallium", "204.3833", 13, 6,
				"Pb", "Lead", "207.2", 14, 6,
				"Bi", "Bismuth", "208.9804", 15, 6,
				"Po", "Polonium", "(209)", 16, 6,
				"At", "Astatine", "(210)", 17, 6,
				"Rn", "Radon", "(222)", 18, 6,
				"Fr", "Francium", "(223)", 1, 7,
				"Ra", "Radium", "(226)", 2, 7,
				"Ac", "Actinium", "(227)", 4, 10,
				"Th", "Thorium", "232.03806", 5, 10,
				"Pa", "Protactinium", "231.0588", 6, 10,
				"U", "Uranium", "238.02891", 7, 10,
				"Np", "Neptunium", "(237)", 8, 10,
				"Pu", "Plutonium", "(244)", 9, 10,
				"Am", "Americium", "(243)", 10, 10,
				"Cm", "Curium", "(247)", 11, 10,
				"Bk", "Berkelium", "(247)", 12, 10,
				"Cf", "Californium", "(251)", 13, 10,
				"Es", "Einstenium", "(252)", 14, 10,
				"Fm", "Fermium", "(257)", 15, 10,
				"Md", "Mendelevium", "(258)", 16, 10,
				"No", "Nobelium", "(259)", 17, 10,
				"Lr", "Lawrencium", "(262)", 18, 10,
				"Rf", "Rutherfordium", "(267)", 4, 7,
				"Db", "Dubnium", "(268)", 5, 7,
				"Sg", "Seaborgium", "(271)", 6, 7,
				"Bh", "Bohrium", "(272)", 7, 7,
				"Hs", "Hassium", "(270)", 8, 7,
				"Mt", "Meitnerium", "(276)", 9, 7,
				"Ds", "Darmstadium", "(281)", 10, 7,
				"Rg", "Roentgenium", "(280)", 11, 7,
				"Cn", "Copernicium", "(285)", 12, 7,
				"Nh", "Nihonium", "(286)", 13, 7,
				"Fl", "Flerovium", "(289)", 14, 7,
				"Mc", "Moscovium", "(290)", 15, 7,
				"Lv", "Livermorium", "(293)", 16, 7,
				"Ts", "Tennessine", "(294)", 17, 7,
				"Og", "Oganesson", "(294)", 18, 7
			];

			// table
			for ( var i = 0; i < table.length; i += 5 ) {

				var element = document.createElement( 'div' );
				element.className = 'CSS3DElement';
				element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
				element.addEventListener('click', function(){alert('clicked');});

				var number = document.createElement( 'div' );
				number.className = 'number';
				number.textContent = ( i / 5 ) + 1;
				element.appendChild( number );

				var symbol = document.createElement( 'div' );
				symbol.className = 'symbol';
				symbol.textContent = table[ i ];
				element.appendChild( symbol );

				var details = document.createElement( 'div' );
				details.className = 'details';
				details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
				element.appendChild( details );

				var object = new CSS3DObject( element );
				object.position.x = Math.random() * 4000 - 2000;
				object.position.y = Math.random() * 4000 - 2000;
				object.position.z = Math.random() * 4000 - 2000;
				scene.add( object );

				this.objects.push( object );

				//

				var object = new THREE.Object3D();
				object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
				object.position.y = - ( table[ i + 4 ] * 180 ) + 990;

				this.targets.table.push( object );
			}

			this.createSphereFormation();
			this.createHelixFormation();
			this.createGridFormation();

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

			if(requestAnimate !== true)
				return;

			controls.update();
	//		TWEEN.update();

			renderer.render( scene, camera );

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
			console.log(renderer);
			//renderer.dispose();
			requestAnimate = false;
			renderer = null;
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

export { iTopoCSS3DBriefcase };
