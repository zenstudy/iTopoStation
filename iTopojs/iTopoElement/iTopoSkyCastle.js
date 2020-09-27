import * as THREE from '../../../build/three.module.js';
import {iTopoEarthSettings} from '../iTopoEarthSettings.js';
import {iTopoTeam } from './iTopoTeam.js';

class iTopoSkyCastle {

	constructor() {

		this.info = {
			castleUUID: '3861590E-CB58-48BA-977C-9F9F107B61AD',
			title: '共享地球事务中心',
			lng: 0,
			lat: 90,
			size: 100,
			dis2Cloud: -220,
			teams:[],//format = iTopoTeam
			sponsors:[],//format = iTopoTeam
		}
	}

	applyToJoining(teamUUID, starUUID) {

	}

}

export {
	iTopoSkyCastle
};
