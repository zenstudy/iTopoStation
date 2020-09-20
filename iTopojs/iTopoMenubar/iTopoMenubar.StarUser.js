/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIRow, UIButton } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';

function iTopoMenubarStarUser( editor , menubar, userStarInfo) {

	var strings = editor.strings;

	var container = new UIPanel();
	//container.setClass( 'menu' );
	container.setClass( 'menu right' );

//	console.log(userStarInfo);
	var title = new UIButton(userStarInfo.userNickname);
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
		console.log(starUUID);
		var star = editor.objectByiTopoUUID(starUUID);
		console.log(star);
		if(star !== undefined && star !== null){
			editor.select(star);// this function will call editor.signals.objectSelected.dispatch(star);
		}
	});
	options.add(starInfoMenu);

	var exitMenu = new UIRow();
	exitMenu.setClass('option');
	exitMenu.setTextContent(strings.getKey('menubar/StarUser/exit'));
	exitMenu.onClick(function() {
		menubar.addMenubarRegisterMenu();
		menubar.addMenubarLoginMenu();
		menubar.removeMenubarStarUser();
		editor.signals.userLogoff.dispatch();
	});
	options.add(exitMenu);

	return container;
}

export { iTopoMenubarStarUser };
