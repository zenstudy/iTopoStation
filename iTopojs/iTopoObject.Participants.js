/**
 * @author mrdoob / http://mrdoob.com/
 */

import * as THREE from '../../build/three.module.js';

import { UIElement,UIPanel, UIRow, UIText, UIInput, UIButton, UISpan } from './iTopoUI.js';

function iTopoObjectParticipants( editor ) {

	var strings = editor.strings;

	var signals = editor.signals;

	this.container = new UIPanel();
	var container = this.container;
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
	//container.setDisplay( 'none' );

	return this;

}

iTopoObjectParticipants.prototype = Object.create( UIElement.prototype );
iTopoObjectParticipants.prototype.constructor = iTopoObjectParticipants;

iTopoObjectParticipants.prototype = {

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			//this.geometryUUID.setValue(taskObject.baseUUID);
			// this.taskTypeSelect.setValue(taskObject.taskType);
			// this.titleInput.setValue(taskObject.title);
			// this.cityInput.setValue(taskObject.city);
			// this.addressInput.setValue(taskObject.address);
			// this.longitudeValueUI.setValue(taskObject.lng);
			// this.latitudeValueUI.setValue(taskObject.lat);
			// this.lightWishValueUI.setValue(taskObject.lightWish);
		}

		this.taskObject = taskObject;
	},

	dispose: function() {
		//this.thumbnailManager.dispose();
	}
}

export { iTopoObjectParticipants };
