import * as THREE from '../../../build/three.module.js';
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from '../../../examples/jsm/loaders/OBJLoader.js';
import { OBJLoader2 } from '../../../examples/jsm/loaders/OBJLoader2.js';
import { DRACOLoader } from '../../../examples/jsm/loaders/DRACOLoader.js';
import { MTLLoader } from '../../../examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from '../../../examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopo3dExplore } from '../iTopoFrame/iTopo3dExplore.js';

function iTopoResourceTracker() {

	this.manager = new THREE.LoadingManager();
	this.manager.onProgress = function(item, loaded, total) {
		console.log(item, loaded, total);
	};

	//this.resMgr = new iTopoResourceTracker();
	this.dracoLoader = new DRACOLoader();
	this.dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');

	this.resources = new Set();

	return this;
}

//iTopoDefaultModelManager.prototype = Object.create( UIElement.prototype );
iTopoResourceTracker.prototype.constructor = iTopoResourceTracker;

iTopoResourceTracker.prototype = {

	dispose: function() {
		this.manager.dispose();
		this.dracoLoader.dispose();
		this.clearResources();
		console.log('===disposed:iTopoThumbnailManager=========== ');
	},

	track: function(resource) {
		if (!resource) {
			return resource;
		}

		// handle children and when material is an array of materials or
		// uniform is array of textures
		if (Array.isArray(resource)) {
			resource.forEach(resource => this.track(resource));
			return resource;
		}

		if (resource.dispose || resource instanceof THREE.Object3D) {
			this.resources.add(resource);
		}
		if (resource instanceof THREE.Object3D) {
			this.track(resource.geometry);
			this.track(resource.material);
			this.track(resource.children);
		} else if (resource instanceof THREE.Material) {
			// We have to check if there are any textures on the material
			for (const value of Object.values(resource)) {
				if (value instanceof THREE.Texture) {
					this.track(value);
				}
			}
			// We also have to check if any uniforms reference textures or arrays of textures
			if (resource.uniforms) {
				for (const value of Object.values(resource.uniforms)) {
					if (value) {
						const uniformValue = value.value;
						if (uniformValue instanceof THREE.Texture ||
							Array.isArray(uniformValue)) {
							this.track(uniformValue);
						}
					}
				}
			}
		}
		return resource;
	},

	untrack: function(resource) {
		this.resources.delete(resource);
	},

	clearResources: function() {
		for (const resource of this.resources) {
			if (resource instanceof THREE.Object3D) {
				if (resource.parent) {
					resource.parent.remove(resource);
				}
			}
			if (resource.dispose) {
				resource.dispose();
			}
		}
		this.resources.clear();
	},

	loadModel: function(resourcType, originPosition, modelSize, fnAfterLoadModel) {
		switch (resourcType) {
			case "iTopoType/TaskObject/EcologicalFarm":
				this.loadTreeModel(originPosition, modelSize, fnAfterLoadModel);
				break;
			case "iTopoType/TaskObject/SharedCanteen":
				this.loadSmallCityModel(originPosition, modelSize, fnAfterLoadModel);
				break;
			case "iTopoType/TaskObject/iTopoSkyCastle":
				this.loadTreeModel(originPosition, modelSize, fnAfterLoadModel);
				break;
			case "iTopoType/TaskObject/iTopoInnerEarth":
				this.loadTreeModel(originPosition, modelSize, fnAfterLoadModel);
				break;
			case "iTopoType/TaskObject/iTopoLunarMoon":
				this.loadTreeModel(originPosition, modelSize, fnAfterLoadModel);
				break;
			case "iTopoType/TaskObject/Star":
				this.loadTreeModel(originPosition, modelSize, fnAfterLoadModel);
				break;
			default:
				this.loadTreeModel(originPosition, modelSize, fnAfterLoadModel);
				console.log('did not implement');
		}
	},

	loadTreeModel: function(originPosition, modelSize, fnAfterLoadModel) {
		var loader = new OBJLoader(this.manager);
		loader.load('./iTopoObjects/00_Default_Resource/tree/tree.obj', function(object) {

			object.traverse(function(child) {
				if (child instanceof THREE.Mesh) {
					var phongMaterial = new THREE.MeshPhongMaterial({
						color: 0x00ff00,
						specular: 0x111111,
						shininess: 5
					});
					child.material = phongMaterial;
					child.receiveShadow = true;
					child.castShadow = true;
				}
			});
			var box = new THREE.Box3().setFromObject(object);
			var scale = modelSize / Math.max(box.max.x, box.max.y, box.max.z);

			object.position.copy(originPosition);
			object.scale.set(scale, scale, scale);
			fnAfterLoadModel(object);
		});
	},

	loadSmallCityModel: function(originPosition, modelSize, fnAfterLoadModel) {
		const glftloader = new GLTFLoader();
		glftloader.load('./iTopoObjects/00_Default_Resource/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {

			var baseModel = gltf.scene;
			baseModel.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			var box = new THREE.Box3().setFromObject(baseModel);
			var scale = modelSize / Math.max(box.max.x, box.max.y, box.max.z);
			baseModel.position.copy(originPosition);
			baseModel.scale.set(scale, scale, scale);
			fnAfterLoadModel(baseModel);
		});
	},

	loadMountainLandscape: function(originPosition, modelSize, fnAfterLoadModel) {

		var scope = this;
		const track = scope.track.bind(scope);

		const loader = new GLTFLoader();
		loader.setDRACOLoader(this.dracoLoader);
		loader.load('./iTopoObjects/00_Default_Resource/mountain_landscape/scene.gltf', (gltf) => {

			var baseModel = track(gltf.scene);
			this.box = new THREE.Box3().setFromObject(baseModel);
			baseModel.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			var box = new THREE.Box3().setFromObject(baseModel);
			var scale = modelSize / Math.max(box.max.x, box.max.y, box.max.z);
			baseModel.position.copy(originPosition);
			baseModel.scale.set(scale, scale, scale);
			fnAfterLoadModel(baseModel);
		});
	},

	loadLittlestTokyo: function(originPosition, modelSize, fnAfterLoadModel) {
		var scope = this;
		const track = scope.track.bind(scope);

		const loader = new GLTFLoader();
		loader.setDRACOLoader(this.dracoLoader);
		loader.load('./iTopoObjects/00_Default_Resource/LittlestTokyo/LittlestTokyo.glb', (gltf) => {

			var baseModel = track(gltf.scene);
			this.box = new THREE.Box3().setFromObject(baseModel);
			baseModel.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			var box = new THREE.Box3().setFromObject(baseModel);
			var scale = modelSize / Math.max(box.max.x, box.max.y, box.max.z);
			baseModel.position.copy(originPosition);
			baseModel.scale.set(scale, scale, scale);
			fnAfterLoadModel(baseModel);
		});
	},
	loadiTopoUser: function(gender, originPosition, modelSize, fnAfterLoadModel) {
		var female = {
			mtl: './iTopoObjects/00_Default_Resource/female02/female02.mtl',
			obj: './iTopoObjects/00_Default_Resource/female02/female02.obj'
		};
		var male = {
			mtl: './iTopoObjects/00_Default_Resource/male02/male02.mtl',
			obj: './iTopoObjects/00_Default_Resource/male02/male02.obj'
		};

		var being = (gender === "female") ? female : male;

		const mtlLoader = new MTLLoader();
		mtlLoader.load(being.mtl, (mtlParseResult) => {

			const objLoader = new OBJLoader2();
			const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
			//materials.Material.side = THREE.DoubleSide;
			objLoader.addMaterials(materials);
			objLoader.load(being.obj, (baseModel) => {

				var box = new THREE.Box3().setFromObject(baseModel);
				var scale = modelSize / Math.max(box.max.x, box.max.y, box.max.z);
				baseModel.position.copy(originPosition);
				baseModel.scale.set(scale, scale, scale);
				fnAfterLoadModel(baseModel);
			});
		});
	},
	loadOutlook: function( objectType, title) {
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay('block');
		displayStand.container.setPosition('absolate');

		//	var dom = document.createElement( 'div' );
		//	displayStand.container.dom.appendChild( dom );

		// var items = [
		// 	{ title: 'menubar/examples/Arkanoid', file: 'arkanoid.app.json' },
		// 	{ title: 'menubar/examples/Camera', file: 'camera.app.json' },
		// 	{ title: 'menubar/examples/Particles', file: 'particles.app.json' },
		// 	{ title: 'menubar/examples/Pong', file: 'pong.app.json' },
		// 	{ title: 'menubar/examples/Shaders', file: 'shaders.app.json' }
		// ];

		// var loader = new THREE.FileLoader();// 以Index.html为根路径
		// loader.load( 'examples/camera.app.json', function ( text ) {
		// 	var player = new iTopo3dExplore.Player();
		// 	player.load( JSON.parse( text ) );
		// 	player.setSize( displayStand.container.dom.offsetWidth, displayStand.container.dom.offsetHeight  );
		// 	player.play();
		// 	displayStand.container.dom.appendChild( player.dom );
		// 	displayStand.container.dom.addEventListener( 'resize', function () {
		// 	 	player.setSize( displayStand.container.dom.offsetWidth, displayStand.container.dom.offsetHeight );
		// 	} );
		// } );

		{
			var sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
			var sphereMateial = new THREE.MeshBasicMaterial({
				color: 0x7777ff,
				wireframe: true
			});
			var sphere = new THREE.Mesh(sphereGeometry, sphereMateial);
		}

		function random(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		const loader = new THREE.CubeTextureLoader(); //载入顺序为[right,left,up,down,front,back]

		var texturePath;
		if(objectType === "iTopoType/TaskObject/EcologicalFarm"){
			var texturePaths = [
				'iTopoObjects/00_Default_Resource/FishPond/',
				'iTopoObjects/00_Default_Resource/Footballfield/',
				'iTopoObjects/00_Default_Resource/Park/'
			];
			var index = random(0, 2);
			texturePath = texturePaths[index] ;
		} else if(objectType === "iTopoType/TaskObject/SharedCanteen"){
			texturePath = 'iTopoObjects/00_Default_Resource/computer-history-museum/';
		} else{
			texturePath = 'iTopoObjects/00_Default_Resource/computer-history-museum/';
		}

		const texture = loader.load([
			texturePath + 'posx.jpg',
			texturePath + 'negx.jpg',
			texturePath + 'posy.jpg',
			texturePath + 'negy.jpg',
			texturePath + 'posz.jpg',
			texturePath + 'negz.jpg',
		]);

		var explore = new iTopo3dExplore.Explore();
		explore.show3D(texture, sphere);
		explore.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight());
		explore.play();

		displayStand.container.dom.appendChild(explore.dom);
		displayStand.container.dom.addEventListener('resize', function() {
			explore.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight());
		});
	}

	// iTopoBaseHelper.prototype.loadiTopoObjModel = function() {
	// 	baseModel = {};
	// 	const mtlLoader = new MTLLoader();
	// 	mtlLoader.load('./iTopoObjects/00_Default_Resource/windmill/windmill-fixed.mtl', (mtlParseResult) => {
	// 		console.log(mtlParseResult);
	// 		const objLoader = new OBJLoader2();
	// 		const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
	// 		materials.Material.side = THREE.DoubleSide;
	// 		objLoader.addMaterials(materials);
	// 		objLoader.load('./iTopoObjects/00_Default_Resource/windmill/windmill.obj', (root) => {
	// 			let matrix2 = new THREE.Matrix4;
	// 			matrix2.makeRotationX(-Math.PI / 2);
	// 			let matrix3 = new THREE.Matrix4;
	// 			matrix3.makeRotationY(Math.PI);
	// 			matrix2.multiply(matrix3);
	// 			matrix2.setPosition(new THREE.Vector3(0, 0, 0));
	// 			root.applyMatrix4(matrix2);
	// 			console.log(root);
	// 			root.scale.set(5, 5, 5);
	// 			baseModel = root;
	// 			this.add(baseModel);
	// 		});
	// 	});
	// }

	// const glftloader = new GLTFLoader();
	// glftloader.load('./iTopoObjects/00_Default_Resource/simple_house_scene/scene.gltf', (gltf) => {

	// 	var baseModel = gltf.scene;
	// 	baseModel.traverse((child) => {
	// 		if (child.isMesh) {
	// 			child.castShadow = true;
	// 			child.receiveShadow = true;
	// 		}
	// 	});

	// 	var box = new THREE.Box3().setFromObject(baseModel);
	// 	var scale =0.81 / Math.max(box.max.x,box.max.y, box.max.z );

	// 	baseModel.scale.set(scale,scale,scale);

	// 	var thumbnailManager = new iTopoThumbnailManager();
	// 	thumbnailManager.create(containerBaseModel.dom);
	// 	thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/StarUser/Header/Outlook' ), baseModel , this.onClickBaseModel);
	// 	thumbnailManager.updateCanvasSize();

	// 	editor.signals.sceneRendering.add( function ( ) {
	// 		thumbnailManager.updateCanvasSize();
	// 		thumbnailManager.render();
	// 	} );
	// });
}

export { iTopoResourceTracker };
