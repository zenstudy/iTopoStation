/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIRow, UIButton } from '../js/libs/ui.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoEarthSettings } from './iTopoEarthSettings.js';

function iTopoMenubarStarUser( editor , menubar, userStarInfo) {

	var strings = editor.strings;

	var container = new UIPanel();
	//container.setClass( 'menu' );
	container.setClass( 'menu right' );

	var title = new UIButton(userStarInfo.starUUID);
	title.setClass( 'title' );
//	title.setTextContent(  );
	container.add( title );

	var options = new UIPanel();
	options.setClass('options');
	container.add(options);

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
