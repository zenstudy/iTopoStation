import { Command } from './Command.js';
import * as THREE from '../../../build/three.module.js';

/**
 * @param editor Editor
 * @param object THREE.Object3D
 * @constructor
 */
function AddiTopoObjArrayCommand( editor, objectArray, toSelectObj) {

	Command.call( this, editor );

	this.type = 'AddiTopoObjArrayCommand';

	this.objectArray = objectArray;
	if ( objectArray !== undefined ) {
		this.name = 'Add objectArray: ' + objectArray[0].name;
	}

	this.toSelectObj = toSelectObj;
}

AddiTopoObjArrayCommand.prototype = {

	execute: function () {

		this.editor.addObjectArray( this.objectArray );

		if(this.toSelectObj !== true )
			return;

		if(this.objectArray[0].name === "layerPlanet"
			|| this.objectArray[0].name === "layerCloud"
			|| this.objectArray[0].name === "layerMarks"
			|| this.objectArray[0].name === "layerStars")
			return;

		if(this.objectArray.length > 0 )
			this.editor.select( this.objectArray[0] );

	},

	undo: function () {

		this.editor.removeObjectArray( this.objectArray );
		this.editor.deselect();

	},

	toJSON: function () {

		var output = Command.prototype.toJSON.call( this );
		//output.object = this.object.toJSON();

		return output;

	},

	fromJSON: function ( json ) {

		Command.prototype.fromJSON.call( this, json );

		//this.object = this.editor.objectByUuid( json.object.object.uuid );

		if ( this.object === undefined ) {

			// var loader = new THREE.ObjectLoader();
			// this.object = loader.parse( json.object );

		}

	}

};

export { AddiTopoObjArrayCommand };
