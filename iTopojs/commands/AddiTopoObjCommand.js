/**
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 */

import { Command } from './Command.js';
import * as THREE from '../../threejs/build/three.module.js';

/**
 * @param editor Editor
 * @param object THREE.Object3D
 * @constructor
 */

function AddiTopoObjCommand(editor, object, toSelectObj) {

	Command.call(this, editor);

	this.type = 'AddiTopoObjCommand';

	this.object = object;
	if (object !== undefined) {
		this.name = 'Add Object: ' + object.name;
	}

	this.toSelectObj = toSelectObj;
}

AddiTopoObjCommand.prototype = {

	execute: function() {

		this.editor.addObject(this.object);

		if(this.toSelectObj !== true)
			return;

		if (this.object.name == "layerPlanet" ||
			this.object.name == "layerCloud" ||
			this.object.name == "layerMarks" ||
			this.object.name == "layerStars")
			return;

		if (this.object.children.length == 0)
			this.editor.select(this.object);
		else
			this.editor.select(this.object.children[0]);
	},

	undo: function() {

		this.editor.removeObject(this.object);
		this.editor.deselect();

	},

	toJSON: function() {

		var output = Command.prototype.toJSON.call(this);
		output.object = this.object.toJSON();

		return output;

	},

	fromJSON: function(json) {

		Command.prototype.fromJSON.call(this, json);

		this.object = this.editor.objectByUuid(json.object.object.uuid);

		if (this.object === undefined) {

			var loader = new THREE.ObjectLoader();
			this.object = loader.parse(json.object);

		}

	}

};

export {
	AddiTopoObjCommand
};
