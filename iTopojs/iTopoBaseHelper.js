//import * as THREE from '../../build/three.module.js';
import {Vector3} from '../threejs/src/math/Vector3.js';
import {Color} from '../threejs/src/math/Color.js';
import {Object3D} from '../threejs/src/core/Object3D.js';
import {Mesh} from '../threejs/src/objects/Mesh.js';
import {MeshBasicMaterial} from '../threejs/src/materials/MeshBasicMaterial.js';
import {TWEEN} from '../threejs/examples/jsm/libs/tween.module.min.js';
import {iTopoEarthModel} from './iTopoEarthModel.js';
import {iTopoEarthSettings} from './iTopoEarthSettings.js';

var orbits = [];
var balls = [];

function iTopoBaseHelper() {

	Object3D.call(this);

	// this.resMgr = new iTopoResourceTracker();
	// this.dracoLoader = new DRACOLoader();
	// this.dracoLoader.setDecoderPath( '../examples/js/libs/draco/gltf/' );

	// for (var i = 2; i < 10; i++) {
	// 	var radius = 3 * i; //设置同心圆，只有半径不一样
	// 	var factorOrbit = new THREE.CircleGeometry(radius, 20); //半径，分段数
	// 	factorOrbit.vertices.shift(); // 第一个节点是中心点

	// 	var material = new THREE.MeshBasicMaterial({
	// 		color: +iTopoEarthModel.RandomColor(),
	// 	})
	// 	var orbitMesh = new THREE.LineLoop(factorOrbit, material);
	// 	orbits.push(factorOrbit);
	// 	this.add(orbitMesh);

	// 	var geometry = new THREE.SphereGeometry(1, 22, 16);
	// 	var material2 = new THREE.MeshBasicMaterial({
	// 		color: +iTopoEarthModel.RandomColor()
	// 	})
	// 	var ball = new THREE.Mesh(geometry, material2);
	// 	var ballCenter = factorOrbit.vertices[0].clone();
	// 	balls.push(ball);
	// 	ball.position.copy(ballCenter);

	// 	this.add(ball);
	// }

	//this.update();
}

iTopoBaseHelper.prototype = Object.create(Object3D.prototype);
iTopoBaseHelper.prototype.constructor = iTopoBaseHelper;

iTopoBaseHelper.prototype.dispose = function() {
	this.children[0].geometry.dispose();
	this.children[0].material.dispose();
	TWEEN.removeAll();

};

iTopoBaseHelper.prototype.setFromObject = function(object) {
	if(object.userData.objectUUID === undefined || object.userData.objectType === undefined ){
		return;
	}

	this.userData = object.userData;
	this.object = object;
	this.children = [];
	this.updateBase();

	//TWEEN.removeAll();
	//this.UpdateWithFetch();

	return this;
};

iTopoBaseHelper.prototype.updateBase = function() {
	var scope = this;
	if (scope.object === undefined)
		return;

	scope.matrix.identity();
	scope.matrixWorld.identity();
	//this.rotation = this.object.rotation;

	scope.position.copy(scope.object.position);

	if (iTopoEarthSettings.GLOBAL_KIND === "Global3D") {
		scope.lookAt(0, 0, 0);
	} else {
		scope.lookAt(scope.object.position.x, scope.object.position.y, 100 * iTopoEarthSettings.CITY_RADIUS);
		scope.object.position.z += 1;
	}
	// for (var i = 0; i < orbits.length; ++i) {
	// 	this.baseDynamic(orbits[i], balls[i]);
	// }
	var originPosition = new THREE.Vector3();
	if(scope.object.userData.objectType === 'iTopoType/TaskObject/EcologicalFarm') {
		editor.resourceTracker.loadMountainLandscape( originPosition, 100, function(baseModel){
			scope.loadiTopoGLTFModel(baseModel);
		});
	} else if (scope.object.userData.objectType === 'iTopoType/TaskObject/SharedCanteen') {
		editor.resourceTracker.loadLittlestTokyo( originPosition, 100, function(baseModel){
			scope.loadiTopoGLTFModel(baseModel);
		});
	} else if(scope.userData.objectType ==='iTopoType/TaskObject/Star'){
		var qrcodeURL = "./iTopoObjects/00_Default_Resource/" + "iTopoBaseQrcode" + ".png";
		scope.CreateQRCode(new THREE.TextureLoader().load(qrcodeURL));
	}
};

// iTopoBaseHelper.prototype.showQRCode = function() {
// 	var scope = this;
// 	let P1 = new Promise( resolve => {
// 		var qrcodeURL = "./iTopoObjects/" + this.userData.objectUUID + "/WXqrcode.png";

// 		editor.stationDB.fileExists(qrcodeURL,function fnAfterGetResult(exist){
// 			alert(exist);
// 			if(exist){
// 				var fLoader = new THREE.FileLoader();
// 				fLoader.load(qrcodeURL,
// 					function ( data ) {// onLoad回调
// 						scope.CreateQRCode(new THREE.TextureLoader().load(qrcodeURL));
// 					}
// 				);
// 			}
// 		})

// 	});

// 	let P2 = new Promise( resolve => {
// 		var qrcodeURL = "./iTopoObjects/00_Default_Resource/" + "iTopoBaseQrcode" + ".png";
// 		scope.CreateQRCode(new THREE.TextureLoader().load(qrcodeURL));
// 	});

// 	console.log('iTopoBaseHelper.showQRCode');
// 	Promise.race([P1 , P2])
// 	.then(value => {
// 	    console.log(value);
// 		editor.signals.sceneGraphChanged.dispatch();
// 	});

// }

iTopoBaseHelper.prototype.showQRCode = function() {
	var scope = this;
	var qrcodeURL = "./iTopoObjects/" + this.userData.objectUUID + "/WXqrcode.png";
	editor.stationDB.fileExists('.' + qrcodeURL, function fnAfterGetResult(exist){
		if(exist){
			var qrcodeURL = "./iTopoObjects/" + scope.userData.objectUUID + "/WXqrcode.png";
			scope.CreateQRCode(new THREE.TextureLoader().load(qrcodeURL));
		} else {
			var qrcodeURL = "./iTopoObjects/00_Default_Resource/" + "iTopoBaseQrcode" + ".png";
			scope.CreateQRCode(new THREE.TextureLoader().load(qrcodeURL));
		}

		editor.signals.sceneGraphChanged.dispatch();
	})
}

iTopoBaseHelper.prototype.CreateQRCode = function(texture) {
		var width = 60;
		var height = 60;
		this.remove(this.fontMesh);

		var maxBoxZ = 0;
		if(this.box !== undefined)	maxBoxZ = this.box.max.z;

		if (iTopoEarthSettings.GLOBAL_KIND === "Global3D") {
			let matrix2 = new THREE.Matrix4;
			matrix2.makeRotationX(-Math.PI / 2);
			let matrix3 = new THREE.Matrix4;
			matrix3.makeRotationY(Math.PI);
			matrix2.multiply(matrix3);
			matrix2.setPosition(new THREE.Vector3(0, 0, - maxBoxZ - height / 2));
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
			matrix2.setPosition(new THREE.Vector3(0, 0, maxBoxZ * iTopoEarthSettings.mapScaleSize + height /
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

iTopoBaseHelper.prototype.getBaseModelURL = function() {
	if (this.userData.objectType === 'iTopoType/TaskObject/EcologicalFarm')
		return './iTopoObjects/00_Default_Resource/mountain_landscape/scene.gltf';
	else if (this.userData.objectType === 'iTopoType/TaskObject/SharedCanteen')
		return './iTopoObjects/00_Default_Resource/LittlestTokyo/LittlestTokyo.glb';
	console.log(this.userData.objectUUID + ':' + this.userData.objectType + ' did not find gltf file.');
	return '';
}

iTopoBaseHelper.prototype.loadiTopoGLTFModel = function(baseModel) {

		if (iTopoEarthSettings.GLOBAL_KIND === "Global3D") {
			let matrix2 = new THREE.Matrix4;
			matrix2.makeRotationX(-Math.PI / 2);
			let matrix3 = new THREE.Matrix4;
			matrix3.makeRotationY(Math.PI);
			matrix2.multiply(matrix3);
			matrix2.setPosition(new THREE.Vector3(0, 0, 0));
			baseModel.applyMatrix4(matrix2);
			//baseModel.scale.set(scale, scale, scale);
		} else {
			let matrix2 = new THREE.Matrix4;
			matrix2.makeRotationX(Math.PI / 2);
			//matrix2.setPosition(new THREE.Vector3(0, 0, iTopoEarthSettings.zHeight));
			baseModel.applyMatrix4(matrix2);
			//let tmpScale = scale * iTopoEarthSettings.mapScaleSize;
			//baseModel.scale.set(tmpScale, tmpScale, tmpScale);
		}
		this.add(baseModel);

		this.showQRCode();
		setTimeout(function(){
			editor.signals.sceneGraphChanged.dispatch();
		},200);
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

export { iTopoBaseHelper };
