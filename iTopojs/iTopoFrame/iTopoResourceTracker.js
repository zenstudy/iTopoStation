import * as THREE from '../../threejs/build/three.module.js';
import { GLTFLoader } from '../../threejs/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from '../../threejs/examples/jsm/loaders/OBJLoader.js';
import { OBJLoader2 } from '../../threejs/examples/jsm/loaders/OBJLoader2.js';
import { DRACOLoader } from '../../threejs/examples/jsm/loaders/DRACOLoader.js';
import { MTLLoader } from '../../threejs/examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from '../../threejs/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

function iTopoResourceTracker() {

	this.manager = new THREE.LoadingManager();
	this.manager.onProgress = function(item, loaded, total) {
		console.log(item, loaded, total);
	};

	//this.resMgr = new iTopoResourceTracker();
	this.dracoLoader = new DRACOLoader();
	this.dracoLoader.setDecoderPath('threejs/examples/js/libs/draco/gltf/');

	this.resources = new Set();

	return this;
}

//iTopoDefaultModelManager.prototype = Object.create( UIElement.prototype );
iTopoResourceTracker.prototype.constructor = iTopoResourceTracker;

iTopoResourceTracker.prototype = {

	dispose: function() {
		//this.manager.dispose();
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
				this.loadMountainLandscape(originPosition, modelSize, fnAfterLoadModel);
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

	loadiTopoEarthLogo: function(originPosition, modelSize, fnAfterLoadModel) {
		var scope = this;
		const track = scope.track.bind(scope);

		const loader = new GLTFLoader();
		loader.setDRACOLoader(this.dracoLoader);
		loader.load('./iTopoObjects/00_Default_Resource/iTopoEarthLogo/iTopoEarthLogo.glb', (gltf) => {

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

	loadiTopoTasksLogo: function(originPosition, modelSize, fnAfterLoadModel) {
		var scope = this;
		const track = scope.track.bind(scope);

		const loader = new GLTFLoader();
		loader.setDRACOLoader(this.dracoLoader);
		loader.load('./iTopoObjects/00_Default_Resource/iTopoTasksLogo/iTopoTasksLogo.glb', (gltf) => {

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

	loadDefaultProduct: function(originPosition, modelSize, fnAfterLoadProduct) {
		var modelURL = "./iTopoObjects/00_Default_Resource/boomBox/glTF-Binary/BoomBox.glb";
		var gltfLoader = new GLTFLoader();
		gltfLoader.load( modelURL, function ( gltf ) {
			var boomBox = gltf.scene;
			boomBox.traverse( function ( object ) {
				if ( object.isMesh ) {
					//object.material.envMap = reflectionCube;
					//object.material = material;
					object.geometry.rotateY( - Math.PI );
					object.castShadow = true;
				}
			} );

			var box = new THREE.Box3().setFromObject(boomBox);
			var scale = modelSize / Math.max(box.max.x, box.max.y, box.max.z );
			boomBox.scale.set(scale,scale,scale);
			boomBox.position.copy(originPosition);
			//boomBox.add( positionalAudio );//可以添加背景音乐

			fnAfterLoadProduct(boomBox);
		});
	},

	loadWindmill : function(originPosition, modelSize, fnAfterLoad) {
		const mtlLoader = new MTLLoader();
		mtlLoader.load('./iTopoObjects/00_Default_Resource/windmill/windmill-fixed.mtl', (mtlParseResult) => {
			console.log(mtlParseResult);
			const objLoader = new OBJLoader2();
			const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
			materials.Material.side = THREE.DoubleSide;
			objLoader.addMaterials(materials);
			objLoader.load('./iTopoObjects/00_Default_Resource/windmill/windmill.obj', (windMill) => {

				var box = new THREE.Box3().setFromObject(windMill);
				var scale = modelSize / Math.max(box.max.x, box.max.y, box.max.z );
				windMill.scale.set(scale,scale,scale);
				windMill.position.copy(originPosition);
				//boomBox.add( positionalAudio );//可以添加背景音乐

				fnAfterLoad(windMill);
			});
		});
	},

	loadProductModel: function(modelURL,originPosition, modelSize, fnAfterLoadProduct) {
		var gltfLoader = new GLTFLoader();
		gltfLoader.setDRACOLoader(this.dracoLoader);
		gltfLoader.load( modelURL, function ( gltf ) {
			var boomBox = gltf.scene;
			boomBox.traverse( function ( object ) {
				if ( object.isMesh ) {
					//object.material.envMap = reflectionCube;
					//object.material = material;
					object.geometry.rotateY( - Math.PI );
					object.castShadow = true;
				}
			} );

			var box = new THREE.Box3().setFromObject(boomBox);
			var scale = modelSize / Math.max(box.max.x, box.max.y, box.max.z );
			boomBox.scale.set(scale,scale,scale);
			boomBox.position.copy(originPosition);
			//boomBox.add( positionalAudio );//可以添加背景音乐

			fnAfterLoadProduct(boomBox);
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

	loadOutlook: function( objectType, fnAfterLoadOutLook) {

		function random(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		const loader = new THREE.CubeTextureLoader(); //载入顺序为[right,left,up,down,front,back]

		var texturePath;
		if(objectType === "iTopoType/TaskObject/EcologicalFarm"){
			var texturePaths = [
				'iTopoObjects/00_Default_Resource/Footballfield/',
				'iTopoObjects/00_Default_Resource/Park/',
				'iTopoObjects/00_Default_Resource/FishPond/',
			];
			var index = random(0, 2);
			texturePath = texturePaths[index] ;
		} else if(objectType === "iTopoType/TaskObject/SharedCanteen"){
			texturePath = 'iTopoObjects/00_Default_Resource/computer-history-museum/';
		} else if(objectType === "iTopoType/TaskObject/InnerEarth"){
			texturePath = 'iTopoObjects/00_Default_Resource/WaterWorld/';
		} else {
			texturePath = 'iTopoObjects/00_Default_Resource/cosmos/';
		}

		const texture = loader.load([
			texturePath + 'posx.jpg',
			texturePath + 'negx.jpg',
			texturePath + 'posy.jpg',
			texturePath + 'negy.jpg',
			texturePath + 'posz.jpg',
			texturePath + 'negz.jpg',
		]);

		fnAfterLoadOutLook(texture);
	},
}

export { iTopoResourceTracker };
