/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / http://github.com/Mugen87
 * @author Hectate / http://www.github.com/Hectate
 */

import { LineSegments } from '../../src/objects/LineSegments.js';
import { LineBasicMaterial } from '../../src/materials/LineBasicMaterial.js';
import { Float32BufferAttribute } from '../../src/core/BufferAttribute.js';
import { BufferGeometry } from '../../src/core/BufferGeometry.js';
import { Color } from '../../src/math/Color.js';

function iTopoBaseHelper( radius, radials, circles, divisions, color1, color2 ) {

	radius = radius || 10;
	radials = radials || 16;
	circles = circles || 8;
	divisions = divisions || 64;
	color1 = new Color( color1 !== undefined ? color1 : 0x444444 );
	color2 = new Color( color2 !== undefined ? color2 : 0x888888 );

	const vertices = [];
	const colors = [];

	// create the radials

	for ( let i = 0; i <= radials; i ++ ) {

		const v = ( i / radials ) * ( Math.PI * 2 );

		const x = Math.sin( v ) * radius;
		const z = Math.cos( v ) * radius;

		vertices.push( 0, 0, 0 );
		vertices.push( x, 0, z );

		const color = ( i & 1 ) ? color1 : color2;

		colors.push( color.r, color.g, color.b );
		colors.push( color.r, color.g, color.b );

	}

	// create the circles

	for ( let i = 0; i <= circles; i ++ ) {

		const color = ( i & 1 ) ? color1 : color2;

		const r = radius - ( radius / circles * i );

		for ( let j = 0; j < divisions; j ++ ) {

			// first vertex

			let v = ( j / divisions ) * ( Math.PI * 2 );

			let x = Math.sin( v ) * r;
			let z = Math.cos( v ) * r;

			vertices.push( x, 0, z );
			colors.push( color.r, color.g, color.b );

			// second vertex

			v = ( ( j + 1 ) / divisions ) * ( Math.PI * 2 );

			x = Math.sin( v ) * r;
			z = Math.cos( v ) * r;

			vertices.push( x, 0, z );
			colors.push( color.r, color.g, color.b );

		}

	}

	const geometry = new BufferGeometry();
	geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
	geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

	const material = new LineBasicMaterial( { vertexColors: true, toneMapped: false } );

	LineSegments.call( this, geometry, material );

	this.type = 'iTopoBaseHelper';

}

iTopoBaseHelper.prototype = Object.create( LineSegments.prototype );
iTopoBaseHelper.prototype.constructor = iTopoBaseHelper;

export { iTopoBaseHelper };
