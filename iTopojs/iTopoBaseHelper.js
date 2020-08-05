/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */

import {Vector3} from '../../src/math/Vector3.js';
import {Color} from '../../src/math/Color.js';
import {Object3D} from '../../src/core/Object3D.js';
import {Mesh} from '../../src/objects/Mesh.js';
import {MeshBasicMaterial} from '../../src/materials/MeshBasicMaterial.js';
import {TWEEN} from '../../examples/jsm/libs/tween.module.min.js';
import {iTopoEarthModel} from './iTopoEarthModel.js';
import {iTopoEarthSettings} from './iTopoEarthSettings.js';

var orbits = [];
var balls = [];
var baseUUID;
var fontMesh;

function iTopoBaseHelper() {

	Object3D.call(this);

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

	this.update();
}

iTopoBaseHelper.prototype = Object.create(Object3D.prototype);
iTopoBaseHelper.prototype.constructor = iTopoBaseHelper;

iTopoBaseHelper.prototype.dispose = function() {
	this.children[0].geometry.dispose();
	this.children[0].material.dispose();
};

iTopoBaseHelper.prototype.update = function() {

	if (this.object === undefined)
		return;

	this.matrix.identity();
	this.matrixWorld.identity();
	//this.rotation = this.object.rotation;

	this.position.copy(this.object.position);

	if (iTopoEarthSettings.GLOBAL_KIND === "Global3D") {
		this.lookAt(0, 0, 0);

	} else {
		this.lookAt(this.object.position.x, this.object.position.y, 2 * iTopoEarthSettings.zHeight);
		this.object.position.z += 2;
	}

	var qrcodeURL = "./iTopojs/QRcode/" + baseUUID + ".png";
	var helper = this;

	// 初始化一个加载器
	var loader = new THREE.TextureLoader();
	loader.load(qrcodeURL,
		// onLoad回调
		function ( texture ) {
			console.log( qrcodeURL );
			helper.ShowQRCode(texture);
		},

		// 目前暂不支持onProgress的回调
		undefined,

		// onError回调
		function ( err ) {
			console.log( err );
			qrcodeURL = "./iTopojs/QRcode/" + "iTopoBaseQrcode" + ".png";
			let texture = new THREE.TextureLoader().load(qrcodeURL);
			helper.ShowQRCode(texture);
		}
	);

	for (var i = 0; i < orbits.length; ++i) {
		this.baseDynamic(orbits[i], balls[i]);
	}
};

iTopoBaseHelper.prototype.ShowQRCode = function(texture) {
	var width = 30;
	var height = 30;
	this.remove(fontMesh);

	//let texture = new THREE.TextureLoader().load(qrcodeURL);

	if (iTopoEarthSettings.GLOBAL_KIND === "Global3D") {

		let matrix2 = new THREE.Matrix4;
		matrix2.makeRotationX(-Math.PI / 2);
		let matrix3 = new THREE.Matrix4;
		matrix3.makeRotationY(Math.PI);
		matrix2.multiply(matrix3);
		matrix2.setPosition(new THREE.Vector3(0, 0, -height / 2));
		let textPanel = new THREE.PlaneGeometry(width, height);
		textPanel.applyMatrix4(matrix2);

		let material2 = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide,
			opacity: 1,
			transparent: true,
		});
		fontMesh = new THREE.Mesh(textPanel, material2);

		// fontMesh = new THREE.Sprite(new THREE.SpriteMaterial({map: texture}));
		// fontMesh.scale.x = width;
		// fontMesh.scale.y = height;

		this.add(fontMesh);
	} else {
		let matrix2 = new THREE.Matrix4;
		matrix2.makeRotationX(Math.PI / 2);
		matrix2.setPosition(new THREE.Vector3(0, 0, height / 2));
		let textPanel = new THREE.PlaneGeometry(width, height);
		textPanel.applyMatrix4(matrix2);


		let material2 = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide,
			opacity: 1,
			transparent: true,
		});
		fontMesh = new THREE.Mesh(textPanel, material2);

		// fontMesh = new THREE.Sprite(new THREE.SpriteMaterial({map: texture}));
		// fontMesh.scale.x = width;
		// fontMesh.scale.y = height;

		this.add(fontMesh);
	}
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

iTopoBaseHelper.prototype.setFromObject = function(object) {

	this.object = object;
	baseUUID = object.userData;

	this.update();

	return this;
};

iTopoBaseHelper.prototype.copy = function(source) {

	LineSegments.prototype.copy.call(this, source);

	this.object = source.object;

	return this;
};

export {
	iTopoBaseHelper
};
