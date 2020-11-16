import * as THREE from '../../threejs/build/three.module.js';
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

		this.info = {
			baseUUID : THREE.MathUtils.generateUUID(),
			taskType : 'iTopoType/TaskObject/EcologicalFarm',
			title : "有机农场",
			city : "城市1",
			address : "详细地址1",
			lng : lnglatPair[0],
			lat : lnglatPair[1],
			lightWish : "共同创造基地",
			QRcode : "./iTopojs/QRcode/88F48BD-823C-42F1-857A-124E495B351B.jpg",
		}
	}
}

export {
	iTopoBaseObject
};
