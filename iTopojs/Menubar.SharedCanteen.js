/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIRow, UIButton } from '../js/libs/ui.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'

function MenubarSharedCanteen( editor ) {

	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass( 'menu' );

	var title = new UIButton(strings.getKey( 'menubar/SharedCanteen' ));
	title.setClass( 'title' );
//	title.setTextContent( strings.getKey( 'menubar/SharedCanteen' ) );
	container.add( title );

	var options = new UIPanel();
	options.setClass('options');
	container.add(options);

	// yuhuazhai
	var yuhuazhaiMenu = new UIRow();
	yuhuazhaiMenu.setClass('option');
	yuhuazhaiMenu.setTextContent(strings.getKey('menubar/SharedCanteen/yuhuazhai'));
	yuhuazhaiMenu.onClick(function() {
		editor.clear();
		iTopoEarthModel.earthSettings.MAP_KIND = '雨花斋';
		iTopoEarthModel.ReCreate();
	});
	options.add(yuhuazhaiMenu);

	// sharedCookbook
	var sharedCookbookMenu = new UIRow();
	sharedCookbookMenu.setClass('option');
	sharedCookbookMenu.setTextContent(strings.getKey('menubar/SharedCanteen/sharedCookbook'));
	sharedCookbookMenu.onClick(function() {
		alert("coming soon!")
	});
	options.add(sharedCookbookMenu);

	return container;

}

export { MenubarSharedCanteen };
