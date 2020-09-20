import * as THREE from '../../../build/three.module.js';
import {iTopoEarthSettings} from '../iTopoEarthSettings.js';

class iTopoBaseObject {
	constructor() {

		function randonlnglatPair() {
			const plusOrMinus_lngx = Math.round(Math.random()) * 2 - 1;
			const plusOrMinus_latx = Math.round(Math.random()) * 2 - 1;
			const lng = plusOrMinus_lngx * (Math.random() * 180);
			const lat = plusOrMinus_latx * (Math.random() * 90);
			return [lng, lat];
		}
		var lnglatPair = randonlnglatPair();

		this.baseUUID = THREE.MathUtils.generateUUID(),
			this.taskType = 'iTopoType/TaskObject/EcologicalFarm';
		this.title = "有机农场";
		this.city = "城市1";
		this.address = "详细地址1";
		this.lng = lnglatPair[0];
		this.lat = lnglatPair[1];
		this.lightWish = "共同创造基地";
		this.QRcode = "./iTopojs/QRcode/88F48BD-823C-42F1-857A-124E495B351B.jpg";
	}
}

export {
	iTopoBaseObject
};
