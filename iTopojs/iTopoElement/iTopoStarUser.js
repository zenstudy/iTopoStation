import * as THREE from '../../../build/three.module.js';
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

		this.starUUID = THREE.MathUtils.generateUUID();
		this.starType = 'iTopoType/TaskObject/Star';
		this.userNickname = 'skystar';
		this.gender = "female"; //"male", "female"
		this.cellPhone = 13688888888;
		this.password = 'lightstar';
		this.lng = lnglatPair[0];
		this.lat = lnglatPair[1];
		this.starWish = "star wish";
		this.wxQRcode = '';
		this.userRegisteredBases = [];
	}

	setStarUserInfo(starUserInfo){
		this.starUUID = starUserInfo.starUUID;
		this.starType = starUserInfo.starType;
		this.userNickname = starUserInfo.userNickname;
		this.gender =starUserInfo.gender;
		this.cellPhone = starUserInfo.cellPhone;
		this.password = starUserInfo.password;
		this.lng = starUserInfo.lng;
		this.lat = starUserInfo.lat;
		this.starWish = starUserInfo.starWish;
		this.wxQRcode = starUserInfo.wxQRcode;
		this.userRegisteredBases = starUserInfo.userRegisteredBases;
	}

	alreadyLoggedIn(){
		if(this.starUUID === '' )
			return false;
		if(this.userNickname === '' )
			return false;
		if(this.cellPhone === '' )
			return false;
		if(this.password === '' )
			return false;
		return true;
	}

	storeActiveUserInfo2Config(editor) {
		editor.config.setKey('activedStarUserUUID', this.starUUID);
		editor.config.setKey('activedStarUserNickname', this.userNickname);
		editor.config.setKey('activedStarUserCellPhone', this.cellPhone);
		editor.config.setKey('activedStarUserToken', this.password);
	}

	restoreActiveUser(editor) {
		this.starUUID = editor.config.getKey('activedStarUserUUID');
		this.userNickname = editor.config.getKey('activedStarUserNickname');
		this.cellPhone = editor.config.getKey('activedStarUserCellPhone');
		this.password = editor.config.getKey('activedStarUserToken');
	}
}

export {
	iTopoStarUser
};
