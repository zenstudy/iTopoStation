import { iTopoOrbitControls } from './iTopoOrbitControls.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoEarthBuilder } from './iTopoEarthBuilder.js';
import { UIPanel } from '../iTopoUI.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';
import { iTopoTrinityHandler } from './iTopoTrinityHandler.js';

var iTopoStandPlatform = {

	Explore: function(title) {
		var scope = this;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay('block');
		//displayStand.container.setPosition('absolate');

		this.width = displayStand.container.dom.offsetWidth;
		this.height = displayStand.contexHeight();

		displayStand.container.dom.addEventListener('resize', function() {
			scope.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight());
		});

		displayStand.closeBtn.dom.addEventListener('click', function() {
			scope.stop();
			scope.dispose();
			scope = null;
		});

		var taskBriefcase = new iTopoTaskBriefcase( editor );
		displayStand.container.dom.appendChild( taskBriefcase.dom );

		var camera, controls, scene, renderer, events = {};
		var trinityHandler = new iTopoTrinityHandler()

		/* 渲染器 */
		function initRender() {
			renderer = new THREE.WebGLRenderer({
				alpha: true,
				antialias: true
			});
			renderer.setPixelRatio(scope.width / scope.height);
			renderer.setSize(scope.width, scope.height);
			//renderer.outputEncoding = THREE.sRGBEncoding;
			renderer.setClearColor('#86c9c9');
			renderer.setClearAlpha(0.5);

			// var project = json.project;
			// if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
			// if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
			// if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
			// if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
			// if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
			// if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;
		}

		initRender();

		var vrButton = VRButton.createButton(renderer);

		var onDownPosition = new THREE.Vector2();
		var onUpPosition = new THREE.Vector2();

		var container = new UIPanel();
		container.setPosition('absolute');
	//	container.setOverflow('hidden');

		displayStand.container.dom.appendChild(container.dom);
		scope.dom = container.dom;
		scope.dom.appendChild(renderer.domElement);

		/* 灯光 */
		function initLight() {
			scene.add(new THREE.AmbientLight(0x0c0c0c));

			let spotLight = new THREE.SpotLight(0xffffff);
			spotLight.position.set(-1800, -1800, -1800);

			let spotLight2 = new THREE.SpotLight(0xffffff);
			spotLight2.position.set(1800, 1800, 1800);

			scene.add(spotLight);
			scene.add(spotLight2);

			const skyColor = 0xB1E1FF;  // light blue
			const groundColor = 0xB97A20;  // brownish orange
			const intensity = 1;
			const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
			scene.add(light);
		}

		// album2DImgs = [{imgURL: "" , imgDesc: ""}]
		this.show3D = function(background_texture, objectModel, films, filmColCount) {

			scene = new THREE.Scene();
			scene.background = background_texture;
			this.setScene(scene);

			initLight();

			var camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 10000);
			camera.name = 'Camera';
			camera.position.set(0, 220, 1100);
			camera.lookAt(0, 0, 0);
			this.setCamera(camera);

			controls = new iTopoOrbitControls(camera, renderer.domElement);

			controls.enableDamping = true;  // 使动画循环使用时阻尼或自转 意思是否有惯性
			controls.enablePan = true;
			controls.enableZoom = true;
			controls.minDistance = 0;
			controls.maxDistance = 3000;
			// controls.minZoom =0;
			// controls.maxZoom =10;
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

			dispatch(events.init, arguments);

			scope.createTopMenu();
			scope.createBottomMenu();
			scope.createLeftMenu();
			scope.createRightMenu();

			scope.objectModel = objectModel;
			scope.films = films;

			scope.addObject(scope.objectModel);
			if (scope.films !== null && scope.films !== undefined) {
				scope.filmObjects = iTopoEarthBuilder.createRollFilmCollection(films, {x:0, y:0, z:0}, filmColCount);
				scope.filmObjects.forEach(function(mesh){
					scene.add(mesh);
				})
			}
		};

		this.createTopMenu = function() {
			var scope = this;
			var css3dMenu = document.createElement('div');
			css3dMenu.id = 'TaskViewTopMenu';

			var tableButton = document.createElement('input');
			tableButton.type = "button";
			tableButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/2DAlbum');
			tableButton.addEventListener('click', function() {
				if (scope.objectModel !== null || scope.objectModel !== undefined) {
					scope.scene.remove(scope.objectModel);
				}

				scope.filmObjects.forEach(function(mesh){
					scene.remove(mesh);
				})

				scope.filmObjects.forEach(function(mesh){
					scene.add(mesh);
				})
			})

			css3dMenu.appendChild(tableButton);

			var sphereButton = document.createElement('input');
			sphereButton.type = "button";
			sphereButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/3DModel');
			sphereButton.addEventListener('click', function() {
				if (scope.objectModel !== null || scope.objectModel !== undefined) {
					scope.scene.remove(scope.objectModel);
				}

				scope.filmObjects.forEach(function(mesh){
					scene.remove(mesh);
				})

				scope.addObject(scope.objectModel);
			});
			css3dMenu.appendChild(sphereButton);

			var modelAndAlbumButton = document.createElement('input');
			modelAndAlbumButton.type = "button";
			modelAndAlbumButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/AllStand');
			modelAndAlbumButton.addEventListener('click', function() {
				if (scope.objectModel !== null || scope.objectModel !== undefined) {
					scope.scene.remove(scope.objectModel);
				}

				scope.filmObjects.forEach(function(mesh){
					scene.remove(mesh);
				})

				scope.addObject(scope.objectModel);

				scope.filmObjects.forEach(function(mesh){
						scene.add(mesh);
					});

			});
			css3dMenu.appendChild(modelAndAlbumButton);

			scope.dom.appendChild(css3dMenu);
		};

		this.createBottomMenu = function() {
			var scope = this;
			var css3dMenu = document.createElement('div');
			css3dMenu.id = 'TaskViewBottomMenu';

			var tableButton = document.createElement('input');
			tableButton.type = "button";
			tableButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			tableButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.table, 2000);
			});
			css3dMenu.appendChild(tableButton);

			var helixButton = document.createElement('input');
			helixButton.type = "button";
			helixButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			helixButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.helix, 2000);
			});
			css3dMenu.appendChild(helixButton);

			var sphereButton = document.createElement('input');
			sphereButton.type = "button";
			sphereButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			sphereButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.sphere, 2000);
			});
			css3dMenu.appendChild(sphereButton);

			var gridButton = document.createElement('input');
			gridButton.type = "button";
			gridButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			gridButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.grid, 2000);
			});
			css3dMenu.appendChild(gridButton);

			var randomButton = document.createElement('input');
			randomButton.type = "button";
			randomButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			randomButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.random, 2000);
			});
			css3dMenu.appendChild(randomButton);

			scope.dom.appendChild(css3dMenu);
		};

		this.createLeftMenu = function() {
			var scope = this;
			var css3dMenu = document.createElement('div');
			css3dMenu.id = 'TaskViewLeftMenu';

			var tableButton = document.createElement('input');
			tableButton.type = "button";
			tableButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			tableButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.table, 2000);
			});
			css3dMenu.appendChild(tableButton);

			var helixButton = document.createElement('input');
			helixButton.type = "button";
			helixButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			helixButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.helix, 2000);
			});
			css3dMenu.appendChild(helixButton);

			var sphereButton = document.createElement('input');
			sphereButton.type = "button";
			sphereButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			sphereButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.sphere, 2000);
			});
			css3dMenu.appendChild(sphereButton);

			var gridButton = document.createElement('input');
			gridButton.type = "button";
			gridButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			gridButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.grid, 2000);
			});
			css3dMenu.appendChild(gridButton);

			var randomButton = document.createElement('input');
			randomButton.type = "button";
			randomButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			randomButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.random, 2000);
			});
			css3dMenu.appendChild(randomButton);

			scope.dom.appendChild(css3dMenu);
		};

		this.createRightMenu = function() {
			var scope = this;
			var css3dMenu = document.createElement('div');
			css3dMenu.id = 'TaskViewRightMenu';

			var tableButton = document.createElement('input');
			tableButton.type = "button";
			tableButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			tableButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.table, 2000);
			});
			css3dMenu.appendChild(tableButton);

			var helixButton = document.createElement('input');
			helixButton.type = "button";
			helixButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			helixButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.helix, 2000);
			});
			css3dMenu.appendChild(helixButton);

			var sphereButton = document.createElement('input');
			sphereButton.type = "button";
			sphereButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			sphereButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.sphere, 2000);
			});
			css3dMenu.appendChild(sphereButton);

			var gridButton = document.createElement('input');
			gridButton.type = "button";
			gridButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			gridButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.grid, 2000);
			});
			css3dMenu.appendChild(gridButton);

			var randomButton = document.createElement('input');
			randomButton.type = "button";
			randomButton.value = editor.strings.getKey('iTopoStandPlatform/TaskViewTopMenu/TDB');
			randomButton.addEventListener('click', function() {
				scope.transformWithOutAnimate(scope.targets.random, 2000);
			});
			css3dMenu.appendChild(randomButton);

			scope.dom.appendChild(css3dMenu);
		};


		this.setCamera = function(value) {
			camera = value;
			camera.aspect = this.width / this.height;
			camera.updateProjectionMatrix();
		};

		this.setScene = function(value) {
			this.scene = value;
		};

		this.addObject = function(object) {
			this.scene.add(object);
		}

		this.setSize = function(width, height) {

			this.width = width;
			this.height = height;

			if (camera) {
				camera.aspect = this.width / this.height;
				camera.updateProjectionMatrix();
			}

			if (renderer) {
				renderer.setSize(width, height);
			}

		};

		function dispatch(array, event) {

			for (var i = 0, l = array.length; i < l; i++) {
				array[i](event);
			}

		}

		var time, prevTime;

		function animate() {

			time = performance.now();

			try {
				dispatch(events.update, {
					time: time,
					delta: time - prevTime
				});
			} catch (e) {
				console.error((e.message || e), (e.stack || ""));
			}
			console.log('animate..........');
			//console.log(controls.noRotate+ ',' + controls.noZoom + ',' + controls.noPan);
			controls.update();
			scope.scene.rotation.y -= 0.0002;

			renderer.setViewport(0, 0, renderer.domElement.offsetWidth, renderer.domElement.offsetHeight);
			renderer.render(scope.scene, camera);
			prevTime = time;
		}

		this.play = function() {
			if (renderer.xr.enabled) dom.append(vrButton);
			prevTime = performance.now();

			document.addEventListener('keydown', onDocumentKeyDown);
			document.addEventListener('keyup', onDocumentKeyUp);
			document.addEventListener('mousedown', onDocumentMouseDown);
			document.addEventListener('mouseup', onDocumentMouseUp);
			document.addEventListener('mousemove', onDocumentMouseMove);
			document.addEventListener('touchstart', onDocumentTouchStart);
			document.addEventListener('touchend', onDocumentTouchEnd);
			document.addEventListener('touchmove', onDocumentTouchMove);

			dispatch(events.start, arguments);
			renderer.setAnimationLoop(animate);
		};

		this.stop = function() {
			if (renderer.xr.enabled) vrButton.remove();

			document.removeEventListener('keydown', onDocumentKeyDown);
			document.removeEventListener('keyup', onDocumentKeyUp);
			document.removeEventListener('mousedown', onDocumentMouseDown);
			document.removeEventListener('mouseup', onDocumentMouseUp);
			document.removeEventListener('mousemove', onDocumentMouseMove);
			document.removeEventListener('touchstart', onDocumentTouchStart);
			document.removeEventListener('touchend', onDocumentTouchEnd);
			document.removeEventListener('touchmove', onDocumentTouchMove);

			dispatch(events.stop, arguments);
			renderer.setAnimationLoop(null);
		};

		this.clearScene = function(scene) {
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

		this.dispose = function() {
			this.clearScene(scope.scene);
			renderer.dispose();
			camera = undefined;
			scope.scene = undefined;
		};

		//
		function getMousePosition(dom, x, y) {
			var rect = dom.getBoundingClientRect();
			return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
		}

		var raycaster = new THREE.Raycaster();
		var mouse = new THREE.Vector2();

		function getIntersects(point, objects) {

			mouse.set((point.x * 2) - 1, -(point.y * 2) + 1);
			raycaster.setFromCamera(mouse, camera);
			var interObjs = raycaster.intersectObjects(scene.children);

			return interObjs;
		}

		function handleClick() {

			if( onUpPosition.x > 1.0 || onUpPosition.y > 1.0)
				return;

			if ( onDownPosition.distanceTo( onUpPosition ) === 0 ) {
				var intersects = getIntersects( onUpPosition, scope.objects);

				if ( intersects.length > 0 ) {
					var SELECTED = intersects[ 0 ].object;
					trinityHandler.setSelected(SELECTED);
					//console.log(SELECTED.userData);
					scope.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight()-500);
					editor.signals.objectInStandPlatformSelected.dispatch(SELECTED);
				} else {
					scope.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight());
					editor.signals.objectInStandPlatformSelected.dispatch(null);
					trinityHandler.setSelected(null);
				}
			}
		}

		function handleMouseMove(mousePosition) {

			if( mousePosition.x > 1.0 || mousePosition.y > 1.0)
				return;

			var intersects = getIntersects( mousePosition, scope.objects);
			if ( intersects.length > 0 ) {
				var HOVERED = intersects[ 0 ].object;
				trinityHandler.setHovered(HOVERED);
			} else {
				trinityHandler.setHovered(null);
			}
		}

		function onDocumentKeyDown(event) {
			dispatch(events.keydown, event);
		}

		function onDocumentKeyUp(event) {
			dispatch(events.keyup, event);
		}

		function onDocumentMouseDown(event) {

			var array = getMousePosition(renderer.domElement, event.clientX, event.clientY);
			onDownPosition.fromArray(array);

			dispatch(events.mousedown, event);
		}

		function onDocumentMouseUp(event) {

			var array = getMousePosition(renderer.domElement, event.clientX, event.clientY);
			onUpPosition.fromArray(array);

			handleClick();
			//document.removeEventListener( 'mouseup', onMouseUp, false );
			dispatch(events.mouseup, event);
		}


		function onDocumentMouseMove(event) {

			var mousePosition = new THREE.Vector2();
			var array = getMousePosition(renderer.domElement, event.clientX, event.clientY);
			mousePosition.fromArray(array);

			handleMouseMove(mousePosition);
			dispatch(events.mousemove, event);
		}

		function onDocumentTouchStart(event) {
			dispatch(events.touchstart, event);
		}

		function onDocumentTouchEnd(event) {
			dispatch(events.touchend, event);
		}

		function onDocumentTouchMove(event) {
			dispatch(events.touchmove, event);
		}
	}
};

export {
	iTopoStandPlatform
};
