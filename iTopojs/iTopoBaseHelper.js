/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Vector3 } from '../../src/math/Vector3.js';
import { Color } from '../../src/math/Color.js';
import { Object3D } from '../../src/core/Object3D.js';
import { Mesh } from '../../src/objects/Mesh.js';
import { MeshBasicMaterial } from '../../src/materials/MeshBasicMaterial.js';
import { TWEEN } from '../../examples/jsm/libs/tween.module.min.js';
import { iTopoEarthModel } from './iTopoEarthModel.js';

var orbits = [];
var balls  = [];
function iTopoBaseHelper( ) {

	Object3D.call( this );

	for (var i = 2; i < 10; i++) {
		var radius = 3 * i; //设置同心圆，只有半径不一样
		var factorOrbit = new THREE.CircleGeometry(radius, 20); //半径，分段数
		factorOrbit.vertices.shift(); // 第一个节点是中心点

		var material = new THREE.MeshBasicMaterial({color: +iTopoEarthModel.RandomColor(),})
		var orbitMesh = new THREE.LineLoop(factorOrbit, material);
		orbits.push(factorOrbit);
		this.add( orbitMesh );

		var geometry = new THREE.SphereGeometry(1, 22, 16);
		var material2 = new THREE.MeshBasicMaterial({
			color: +iTopoEarthModel.RandomColor()
		})
		var ball = new THREE.Mesh(geometry, material2);
		var ballCenter = factorOrbit.vertices[0].clone();
		balls.push(ball);
		ball.position.copy(ballCenter);

		this.add( ball );
	}

	this.update();
}

iTopoBaseHelper.prototype = Object.create( Object3D.prototype );
iTopoBaseHelper.prototype.constructor = iTopoBaseHelper;

iTopoBaseHelper.prototype.dispose = function () {
	this.children[ 0 ].geometry.dispose();
	this.children[ 0 ].material.dispose();
};

iTopoBaseHelper.prototype.update = function () {
	if(this.object !== undefined)
	{
		console.log(this.object);
		console.log(this.object.position);
		this.position.copy( this.object.position );
		this.lookAt(0, 0, 0);
		console.log(orbits);
		for(var i=0; i < orbits.length; ++i){
			this.baseDynamic(orbits[i],balls[i]);
		}
	}
};

iTopoBaseHelper.prototype.baseDynamic = function (factorOrbit, ball) {
	var __this = this;
	var stepCount = factorOrbit.vertices.length-1;
	var tween = new TWEEN.Tween({step:0})
		.to({step:stepCount}, 10000)
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

iTopoBaseHelper.prototype.setFromObject = function ( object ) {

	this.object = object;
	this.update();

	return this;
};

iTopoBaseHelper.prototype.copy = function ( source ) {

	LineSegments.prototype.copy.call( this, source );

	this.object = source.object;

	return this;
};

export { iTopoBaseHelper };
