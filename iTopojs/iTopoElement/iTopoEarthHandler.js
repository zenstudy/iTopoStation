import { UIElement } from '../iTopoUI.js';
import {iTopoEarthModel} from '../iTopoEarthModel.js';

function iTopoEarthHandler(editor, sidebar, userBriefcase) {

	var scope = this;
	scope.sidebar = sidebar;
	scope.userBriefcase = userBriefcase;

	editor.signals.userRegisteredOrLogin.add(function(starUser) {
		userBriefcase.removeAllTabs();
		userBriefcase.createUserBriefcase();
		userBriefcase.refreshUserBriefcase(starUser);
	});

	editor.signals.userLogoff.add(function() {
		userBriefcase.removeAllTabs();
		userBriefcase.createBluePrintPage();
	});

	editor.signals.baseRegistered.add( function(starUUID, baseObjectOnEarth){

		editor.stationDB.registerBaseObjectOnEarth(baseObjectOnEarth, function(){

			editor.scene.rotation.y = 0;
			editor.sceneHelpers.rotation.y = 0;
			iTopoEarthModel.appendBaseObject(baseObjectOnEarth);
			scope.userBriefcase.registerBaseIntoMineAsset(baseObjectOnEarth);
			console.log(starUUID);
			editor.stationDB.fetchUserWithStarUUID(starUUID, function(starUserInfo){
				console.log(starUserInfo);
				if(starUserInfo.userRegisteredBases === undefined) {
					starUserInfo.userRegisteredBases = [];
				}
				starUserInfo.userRegisteredBases.push(baseObjectOnEarth.baseUUID);
				editor.stationDB.updateStarUser(starUserInfo, function(){
					console.log('updateStarUser:');
					console.log(starUserInfo);
				});
			})

		});

	} );

	return this;
}

iTopoEarthHandler.prototype = Object.create( UIElement.prototype );
iTopoEarthHandler.prototype.constructor = iTopoEarthHandler;

export { iTopoEarthHandler };
