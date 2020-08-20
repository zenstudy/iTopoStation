//import * as THREE from '../../build/three.module.js';
import {Vector3} from '../../src/math/Vector3.js';
import {Color} from '../../src/math/Color.js';
import {Object3D} from '../../src/core/Object3D.js';
import {Mesh} from '../../src/objects/Mesh.js';
import {MeshBasicMaterial} from '../../src/materials/MeshBasicMaterial.js';
import {TWEEN} from '../../examples/jsm/libs/tween.module.min.js';
import {iTopoEarthModel} from './iTopoEarthModel.js';
import {iTopoEarthSettings} from './iTopoEarthSettings.js';
import {iTopoResourceTracker} from './iTopoResourceTracker.js';
import {ajaxGet,_fetch} from './ajaxPostHelper.js'

import {GLTFLoader} from '../../examples/jsm/loaders/GLTFLoader.js';
import {OBJLoader2} from '../../examples/jsm/loaders/OBJLoader2.js';
import {MTLLoader} from '../../examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from '../../examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';


var orbits = [];
var balls = [];

function iTopoBaseHelper() {

	Object3D.call(this);

	this.resMgr = new iTopoResourceTracker();

	for (var i = 2; i < 10; i++) {
		var radius = 3 * i; //设置同心圆，只有半径不一样
		var factorOrbit = new THREE.CircleGeometry(radius, 20); //半径，分段数
		factorOrbit.vertices.shift(); // 第一个节点是中心点

		var material = new THREE.MeshBasicMaterial({
			color: +iTopoEarthModel.RandomColor(),
		})
		var orbitMesh = new THREE.LineLoop(factorOrbit, material);
		orbits.push(factorOrbit);
		this.add(orbitMesh);

		var geometry = new THREE.SphereGeometry(1, 22, 16);
		var material2 = new THREE.MeshBasicMaterial({
			color: +iTopoEarthModel.RandomColor()
		})
		var ball = new THREE.Mesh(geometry, material2);
		var ballCenter = factorOrbit.vertices[0].clone();
		balls.push(ball);
		ball.position.copy(ballCenter);

		this.add(ball);
	}

	//this.update();
}

iTopoBaseHelper.prototype = Object.create(Object3D.prototype);
iTopoBaseHelper.prototype.constructor = iTopoBaseHelper;

iTopoBaseHelper.prototype.dispose = function() {
	this.children[0].geometry.dispose();
	this.children[0].material.dispose();
};


// iTopoBaseHelper.prototype.UpdateWithFetch = function() {
// 	var __this = this;
// 	fetch(iTopoEarthSettings.CANTEEN_ITOPOBASE_FILE, {
// 		method: 'GET',
// 		mode: 'cors', // 允许发送跨域请求
// 		credentials: 'include'
// 	}).then(function(response) {
// 		//打印返回的json数据
// 		response.json().then(function(json) {
// 			for (var i = 0; i < json.length; i++) {
// 				if(json[i].baseUUID === editor.selected.userData.baseUUID) {
// 					__this.update();
// 					return;
// 				}
// 			}

// 			console.log('did not find base UUID:' + this.userData);
// 			// __this.update();
// 		})
// 	}).catch(function(e) {
// 		console.log('error: ' + e.toString());
// 	})
// }

iTopoBaseHelper.prototype.setFromObject = function(object) {
	//console.log(this.userData + ',' + object.userData);
	// if(this.userData === object.userData){
	// 	this.visiable = true;
	// 	return;
	// }
	if(object.userData.objectUUID === undefined || object.userData.objectType === undefined ){
		return;
	}

	this.userData = object.userData;
	this.object = object;
	this.children = [];

	this.resMgr.clearResources();
	this.updateBase();

	//this.UpdateWithFetch();

	return this;
};

iTopoBaseHelper.prototype.updateBase = function() {

	if (this.object === undefined)
		return;

	this.matrix.identity();
	this.matrixWorld.identity();
	//this.rotation = this.object.rotation;

	this.position.copy(this.object.position);

	if (iTopoEarthSettings.GLOBAL_KIND === "Global3D") {
		this.lookAt(0, 0, 0);
	} else {
		this.lookAt(this.object.position.x, this.object.position.y, 100 * iTopoEarthSettings.CITY_RADIUS);
		this.object.position.z += 1;
	}

	for (var i = 0; i < orbits.length; ++i) {
		this.baseDynamic(orbits[i], balls[i]);
	}

	if (this.object.userData.objectType === 'iTopoType/TaskObject/SharedCanteen'
	|| this.object.userData.objectType === 'iTopoType/TaskObject/EcologicalFarm') {
		this.loadiTopoGLTFModel();
	}

	if(this.userData.objectType ==='iTopoType/TaskObject/Star'){
		console.log(this.position);
		var qrcodeURL = "./iTopojs/QRcode/" + "iTopoBaseQrcode" + ".png";
		this.CreateQRCode(new THREE.TextureLoader().load(qrcodeURL));
	}
};

iTopoBaseHelper.prototype.showQRCode = function() {
	var __this = this;
	let P1 = new Promise( resolve => {
		var qrcodeURL = "./iTopojs/QRcode/" + this.userData.objectUUID + ".png";
		var fLoader = new THREE.FileLoader();
		fLoader.load(qrcodeURL,
			function ( data ) {// onLoad回调
				__this.CreateQRCode(new THREE.TextureLoader().load(qrcodeURL));
			}
		);
	});

	let P2 = new Promise( resolve => {
		var qrcodeURL = "./iTopojs/QRcode/" + "iTopoBaseQrcode" + ".png";
		__this.CreateQRCode(new THREE.TextureLoader().load(qrcodeURL));
	});

	Promise.race([P1 , P2])
	.then(value => {
	    console.log(value);
	})
}

iTopoBaseHelper.prototype.CreateQRCode = function(texture) {
		var width = 60;
		var height = 60;
		this.remove(this.fontMesh);

		var maxBoxZ = 0;
		if(this.box !== undefined)	maxBoxZ = this.box.max.z;

		const modelScale = this.getBaseModelScale(this.modelURL);
		console.log('boxz=' + maxBoxZ + ", modelscale=" + modelScale);

		if (iTopoEarthSettings.GLOBAL_KIND === "Global3D") {
			let matrix2 = new THREE.Matrix4;
			matrix2.makeRotationX(-Math.PI / 2);
			let matrix3 = new THREE.Matrix4;
			matrix3.makeRotationY(Math.PI);
			matrix2.multiply(matrix3);
			matrix2.setPosition(new THREE.Vector3(0, 0, - maxBoxZ * modelScale - height / 2));
			let textPanel = new THREE.PlaneGeometry(width, height);
			textPanel.applyMatrix4(matrix2);

			let material2 = new THREE.MeshBasicMaterial({
				map: texture,
				side: THREE.DoubleSide,
				opacity: 1,
				transparent: true,
			});
			this.fontMesh = new THREE.Mesh(textPanel, material2);

			// this.fontMesh = new THREE.Sprite(new THREE.SpriteMaterial({map: texture}));
			// this.fontMesh.scale.x = width;
			// this.fontMesh.scale.y = height;

			this.add(this.fontMesh);
		} else {
			let matrix2 = new THREE.Matrix4;
			matrix2.makeRotationX(Math.PI / 2);
			matrix2.setPosition(new THREE.Vector3(0, 0, maxBoxZ * modelScale * iTopoEarthSettings.mapScaleSize + height /
				2));
			let textPanel = new THREE.PlaneGeometry(width, height);
			textPanel.applyMatrix4(matrix2);

			let material2 = new THREE.MeshBasicMaterial({
				map: texture,
				side: THREE.DoubleSide,
				opacity: 1,
				transparent: true,
			});
			this.fontMesh = new THREE.Mesh(textPanel, material2);

			// this.fontMesh = new THREE.Sprite(new THREE.SpriteMaterial({map: texture}));
			// this.fontMesh.scale.x = width;
			// this.fontMesh.scale.y = height;

			this.add(this.fontMesh);
		}
	}

	iTopoBaseHelper.prototype.loadiTopoObjModel = function() {
		baseModel = {};
		const mtlLoader = new MTLLoader();
		mtlLoader.load('./iTopojs/baseModelFiles/windmill/windmill-fixed.mtl', (mtlParseResult) => {
			console.log(mtlParseResult);
			const objLoader = new OBJLoader2();
			const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
			materials.Material.side = THREE.DoubleSide;
			objLoader.addMaterials(materials);
			objLoader.load('./iTopojs/baseModelFiles/windmill/windmill.obj', (root) => {
				let matrix2 = new THREE.Matrix4;
				matrix2.makeRotationX(-Math.PI / 2);
				let matrix3 = new THREE.Matrix4;
				matrix3.makeRotationY(Math.PI);
				matrix2.multiply(matrix3);
				matrix2.setPosition(new THREE.Vector3(0, 0, 0));
				root.applyMatrix4(matrix2);
				console.log(root);
				root.scale.set(5, 5, 5);
				baseModel = root;
				this.add(baseModel);
			});
		});
	}

iTopoBaseHelper.prototype.getBaseModelURL = function() {
	if (this.userData.objectType === 'iTopoType/TaskObject/EcologicalFarm')
		return './iTopojs/baseModelFiles/mountain_landscape/scene.gltf';
	else if (this.userData.objectType === 'iTopoType/TaskObject/SharedCanteen')
		return './iTopojs/baseModelFiles/simple_house_scene/scene.gltf';
	console.log(this.userData.objectUUID + ':' + this.userData.objectType + ' did not find gltf file.');
	return '';
}

iTopoBaseHelper.prototype.getBaseModelScale = function() {

	if (this.userData.objectType === 'iTopoType/TaskObject/EcologicalFarm')
		return 1;
	else if (this.userData.objectType === 'iTopoType/TaskObject/SharedCanteen')
		return 30;

	return 1;
}

iTopoBaseHelper.prototype.loadiTopoGLTFModel = function() {

	this.modelURL = this.getBaseModelURL();
	if (this.modelURL === '')
		return;
	const modelScale = this.getBaseModelScale();
	const track = this.resMgr.track.bind(this.resMgr);

	const loader = new GLTFLoader();
	loader.load(this.modelURL, (gltf) => {

		var baseModel = track(gltf.scene);
		this.box = new THREE.Box3().setFromObject(baseModel);
		baseModel.traverse((child) => {
			if (child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});

		if (iTopoEarthSettings.GLOBAL_KIND === "Global3D") {
			let matrix2 = new THREE.Matrix4;
			matrix2.makeRotationX(-Math.PI / 2);
			let matrix3 = new THREE.Matrix4;
			matrix3.makeRotationY(Math.PI);
			matrix2.multiply(matrix3);
			matrix2.setPosition(new THREE.Vector3(0, 0, 0));
			baseModel.applyMatrix4(matrix2);
			baseModel.scale.set(modelScale, modelScale, modelScale);
		} else {
			let matrix2 = new THREE.Matrix4;
			matrix2.makeRotationX(Math.PI / 2);
			//matrix2.setPosition(new THREE.Vector3(0, 0, iTopoEarthSettings.zHeight));
			baseModel.applyMatrix4(matrix2);
			let tmpScale = modelScale * iTopoEarthSettings.mapScaleSize;
			baseModel.scale.set(tmpScale, tmpScale, tmpScale);
		}
		this.add(baseModel);

		this.showQRCode();
	});
}

iTopoBaseHelper.prototype.baseDynamic = function(factorOrbit, ball) {
	var __this = this;
	var stepCount = factorOrbit.vertices.length - 1;
	var tween = new TWEEN.Tween({
			step: 0
		})
		.to({
			step: stepCount
		}, 10000)
		.easing(TWEEN.Easing.Linear.None)
		//		.delay(1000)
		.onUpdate(function(index) {
			//			console.log(index);
			var pos = factorOrbit.vertices[Math.round(index.step)].clone();
			//pos = pos.applyMatrix4(matrix);
			ball.position.copy(pos);
		})
		.onComplete(function() {
			__this.baseDynamic(factorOrbit, ball);
		})
		.start();
}

iTopoBaseHelper.prototype.copy = function(source) {

	LineSegments.prototype.copy.call(this, source);

	this.object = source.object;

	return this;
};

// iTopoBaseHelper.prototype.dispose = function() {

// };

export {
	iTopoBaseHelper
};
