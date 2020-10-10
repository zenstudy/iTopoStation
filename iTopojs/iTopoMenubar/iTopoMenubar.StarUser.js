import { UIPanel, UIRow, UIButton } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';

function iTopoMenubarStarUser( editor , menubar) {

	var strings = editor.strings;

	var container = new UIPanel();
	//container.setClass( 'menu' );
	container.setClass( 'menu right' );

	var title = new UIButton(editor.starUser.info.userNickname);
	title.setClass( 'title' );
//	title.setTextContent(  );
	container.add( title );

	var options = new UIPanel();
	options.setClass('options');
	container.add(options);

	var starInfoMenu = new UIRow();
	starInfoMenu.setClass('option');
	starInfoMenu.setTextContent(strings.getKey('menubar/StarUser/mineStar'));
	starInfoMenu.onClick(function() {

		var starUUID = editor.config.getKey( 'activedStarUserUUID');
		var star = editor.objectByiTopoUUID(starUUID);
		if(star !== undefined && star !== null){
			editor.select(star);// this function will call editor.signals.objectSelected.dispatch(star);
		}
		editor.stationDB.fetchUserWithStarUUID( starUUID, function(starUserJson){
			editor.scene.rotation.y = 0;
			editor.sceneHelpers.rotation.y = 0;
			iTopoEarthModel.focusStar(starUserJson);
		} )

	});
	options.add(starInfoMenu);

	var exitMenu = new UIRow();
	exitMenu.setClass('option');
	exitMenu.setTextContent(strings.getKey('menubar/StarUser/exit'));
	exitMenu.onClick(function() {

		if(menubar === null || menubar === undefined){
			alert(menubar);
		}

		menubar.addMenubarRegisterMenu();
		menubar.addMenubarLoginMenu();
		menubar.removeMenubarStarUser();
		
		editor.starUser.info = null;
		editor.starUser.storeActiveUserInfo2Config(editor);
		editor.signals.userLogoff.dispatch();

	});
	options.add(exitMenu);

	return container;
}

export { iTopoMenubarStarUser };
