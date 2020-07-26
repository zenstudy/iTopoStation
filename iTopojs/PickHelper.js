import * as THREE from '../../build/three.module.js';

export class PickHelper {
	constructor() {
		this.enablePickHelper = true;
		this.raycaster = new THREE.Raycaster();
		this.pickedObject = null;
		this.pickedObjectSavedColor = 0;
		this.onPickedEvents = new Array();
		this.pickPosition = {x: 0,	y: 0};
		this.glRenderer = null;
	}
	
	//afterPickedObject is callback function
	pick(camera, landMarks) {
		// restore the color if there is a picked object
		if (this.pickedObject) {
			//this.pickedObject.visible = true;
			this.RestorePickedObject();
			this.pickedObject = undefined;
		}

		// cast a ray through the frustum
		this.raycaster.setFromCamera(this.pickPosition, camera);
		// get the list of objects the ray intersected
		const intersectedObjects = this.raycaster.intersectObjects(landMarks.children);
		if (intersectedObjects.length) {
			this.enablePickHelper = false;
			// pick the first object. It's the closest one
			this.pickedObject = intersectedObjects[0];
			//this.pickedObject.visible = false;
			this.BackupPickedObject();
			this.HilightPickedObject();
			this.HandlePickedObject();
		} else {
			this.pickedObject = null;
			//	HintPanel.visible = false;
		}
	}
	
	RegisterHandleFunction( handleFunction)	{
		this.onPickedEvents.push(handleFunction);
	}
	
	BackupPickedObject() {
		this.pickedObjectSavedColor = this.pickedObject.object.material.color.getHex();
	}
	
	HilightPickedObject() {
		this.pickedObject.object.material.color.set(0xff0000);
	}
	
	HandlePickedObject() {
		for (var i=0; i< this.onPickedEvents.length; ++i) {
		   this.onPickedEvents[i](this.pickedObject);
		}
	}
	
	RestorePickedObject() {
		this.pickedObject.object.material.color.set(this.pickedObjectSavedColor)
	}
}
