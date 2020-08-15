/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIRow, UIButton } from './iTopoUI.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoEarthSettings } from './iTopoEarthSettings.js';

function iTopoMenubarSharedCanteen( editor ) {

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
	
	// sharedCookbook
	var sharedCookbookMenu = new UIRow();
	sharedCookbookMenu.setClass('option');
	sharedCookbookMenu.setTextContent(strings.getKey('menubar/SharedCanteen/sharedCookbook'));
	sharedCookbookMenu.onClick(function() {
		alert("coming soon!")
	});
	options.add(sharedCookbookMenu);

	// yuhuazhai
	var yuhuazhaiMenu = new UIRow();
	yuhuazhaiMenu.setClass('option');
	yuhuazhaiMenu.setTextContent(strings.getKey('menubar/SharedCanteen/yuhuazhai'));
	yuhuazhaiMenu.onClick(function() {
		editor.clear();
		iTopoEarthSettings.MAP_KIND = '雨花斋';
		iTopoEarthModel.ReCreate();
	});
	options.add(yuhuazhaiMenu);

	return container;

}

export { iTopoMenubarSharedCanteen };
