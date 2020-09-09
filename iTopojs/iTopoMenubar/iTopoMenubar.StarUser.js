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
		editor.select(star);// this function will call editor.signals.objectSelected.dispatch(star);
	});
	options.add(starInfoMenu);

	var exitMenu = new UIRow();
	exitMenu.setClass('option');
	exitMenu.setTextContent(strings.getKey('menubar/StarUser/exit'));
	exitMenu.onClick(function() {
		menubar.container.add(menubar.registerMenu);
		menubar.container.add(menubar.loginMenu);
		menubar.removeMenubarStarUser();
	});
	options.add(exitMenu);

	return container;
}

export { iTopoMenubarStarUser };
