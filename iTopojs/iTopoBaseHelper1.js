/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / http://github.com/Mugen87
 */

import { Box3 } from '../../src/math/Box3.js';
import { LineSegments } from '../../src/objects/LineSegments.js';
import { LineBasicMaterial } from '../../src/materials/LineBasicMaterial.js';
import { BufferAttribute } from '../../src/core/BufferAttribute.js';
import { BufferGeometry } from '../../src/core/BufferGeometry.js';
import { BufferGeometryUtils } from '../../examples/jsm/utils/BufferGeometryUtils.js';

const _box = new Box3();

/*function iTopoBaseHelper( object, color ) {

	this.object = object;

	if ( color === undefined ) color = 0xffff00;

	const indices = new Uint16Array( [ 0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7 ] );
	const positions = new Float32Array( 8 * 3 );

	const geometry = new BufferGeometry();
	geometry.setIndex( new BufferAttribute( indices, 1 ) );
	geometry.setAttribute( 'position', new BufferAttribute( positions, 3 ) );

	LineSegments.call( this, geometry, new LineBasicMaterial( { color: color, toneMapped: false } ) );

	this.type = 'iTopoBaseHelper';

	this.matrixAutoUpdate = false;

	this.update();

};*/

function iTopoBaseHelper( object, color ) {

	this.object = object;
	if ( color === undefined ) color = 0xffff00;

	{
		//绘制食堂的情况
		var canteenCenter = object.position.copy();

		//var grp = new THREE.Group();
		const geometries = [];
		for (var i = 2; i < 10; i++) {
			var radius = 3 * i; //设置同心圆，只有半径不一样
			var factorOrbit = new THREE.CircleGeometry(radius, 20); //半径，分段数
			factorOrbit.vertices.shift(); // 第一个节点是中心点

			var material = new THREE.MeshBasicMaterial({color: +randomColor(),})
			var cycleMesh = new THREE.LineLoop(factorOrbit, material);
			cycleMesh.position.copy(canteenCenter);
			cycleMesh.lookAt(0, 0, 0);

			cycleMesh.updateWorldMatrix(true, false);
			var matrix = cycleMesh.matrixWorld;

			geometries.push(cycleMesh);

			// var geometry = new THREE.SphereGeometry(1, 22, 16);
			// var material2 = new THREE.MeshBasicMaterial({
			// 	color: +randomColor()
			// })
			// var ball = new THREE.Mesh(geometry, material2);
			// var ballCenter = factorOrbit.vertices[0].clone();

			// ballCenter = ballCenter.applyMatrix4(matrix);
			// ball.position.copy(ballCenter);
			// grp.add(ball);
		}

		const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
	}

	LineSegments.call( this, mergedGeometry, new LineBasicMaterial( { color: color, toneMapped: false } ) );

	this.type = 'iTopoBaseHelper';

	this.matrixAutoUpdate = false;

	this.update();
};

iTopoBaseHelper.prototype = Object.create( LineSegments.prototype );
iTopoBaseHelper.prototype.constructor = iTopoBaseHelper;

iTopoBaseHelper.prototype.update = function ( object ) {

	if ( object !== undefined ) {

		console.warn( 'THREE.iTopoBaseHelper: .update() has no longer arguments.' );

	}

	if ( this.object !== undefined ) {

		_box.setFromObject( this.object );

	}

	if ( _box.isEmpty() ) return;

	const min = _box.min;
	const max = _box.max;

	/*
	  5____4
	1/___0/|
	| 6__|_7
	2/___3/

	0: max.x, max.y, max.z
	1: min.x, max.y, max.z
	2: min.x, min.y, max.z
	3: max.x, min.y, max.z
	4: max.x, max.y, min.z
	5: min.x, max.y, min.z
	6: min.x, min.y, min.z
	7: max.x, min.y, min.z
	*/

	const position = this.geometry.attributes.position;
	const array = position.array;

	array[ 0 ] = max.x; array[ 1 ] = max.y; array[ 2 ] = max.z;
	array[ 3 ] = min.x; array[ 4 ] = max.y; array[ 5 ] = max.z;
	array[ 6 ] = min.x; array[ 7 ] = min.y; array[ 8 ] = max.z;
	array[ 9 ] = max.x; array[ 10 ] = min.y; array[ 11 ] = max.z;
	array[ 12 ] = max.x; array[ 13 ] = max.y; array[ 14 ] = min.z;
	array[ 15 ] = min.x; array[ 16 ] = max.y; array[ 17 ] = min.z;
	array[ 18 ] = min.x; array[ 19 ] = min.y; array[ 20 ] = min.z;
	array[ 21 ] = max.x; array[ 22 ] = min.y; array[ 23 ] = min.z;

	position.needsUpdate = true;

	this.geometry.computeBoundingSphere();


};

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
