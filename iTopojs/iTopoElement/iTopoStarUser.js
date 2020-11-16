import * as THREE from '../../threejs/build/three.module.js';
import {iTopoEarthSettings} from '../iTopoEarthSettings.js';

class iTopoStarUser {
	constructor() {

		function randonlnglatPair() {
			const plusOrMinus_lngx = Math.round(Math.random()) * 2 - 1;
			const plusOrMinus_latx = Math.round(Math.random()) * 2 - 1;
			const lng = plusOrMinus_lngx * (Math.random() * 180);
			const lat = plusOrMinus_latx * (Math.random() * 90);
			return [lng,lat];
		}

		var lnglatPair = randonlnglatPair();

		this.info = {
			starUUID: THREE.MathUtils.generateUUID(),
			starType: 'iTopoType/TaskObject/Star',
			userNickname : 'skystar',
			gender : "female", //"male", "female"
			cellPhone : 13688888888,
			password : 'lightstar',
			lng : lnglatPair[0],
			lat : lnglatPair[1],
			starValue : 100,
			starWish : "star wish",
			wxQRcode : '',
			teamJoined : [],
			userRegisteredBases : [],
		}
	}

	setStarUserInfo(starUserInfo){
		this.info = starUserInfo;
	}

	alreadyLoggedIn(){
		if(this.info === null || this.info === undefined || this.info === {} || this.info === [])
			return false;
		if(this.info.starUUID === '' )
			return false;
		if(this.info.userNickname === '' )
			return false;
		if(this.info.cellPhone === '' )
			return false;
		if(this.info.password === '' )
			return false;
		return true;
	}

	storeActiveUserInfo2Config(editor) {
		if( this.info === null ){
			editor.config.setKey('activedStarUserUUID', '');
			editor.config.setKey('activedStarUserNickname', '');
			editor.config.setKey('activedStarUserCellPhone', '');
			editor.config.setKey('activedStarUserToken', '');
		} else {
			editor.config.setKey('activedStarUserUUID', this.info.starUUID);
			editor.config.setKey('activedStarUserNickname', this.info.userNickname);
			editor.config.setKey('activedStarUserCellPhone', this.info.cellPhone);
			editor.config.setKey('activedStarUserToken', this.info.password);
		}

	}

	restoreActiveUser(editor) {
		this.info.starUUID = editor.config.getKey('activedStarUserUUID');
		this.info.userNickname = editor.config.getKey('activedStarUserNickname');
		this.info.cellPhone = editor.config.getKey('activedStarUserCellPhone');
		this.info.password = editor.config.getKey('activedStarUserToken');
	}
}

export {
	iTopoStarUser
};
