/**
 * @author mrdoob / http://mrdoob.com/
 */

import {UIPanel,UIRow,UIButton} from './iTopoUI.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoEarthSettings } from './iTopoEarthSettings.js';

function iTopoMenubarEarthHub(editor) {

	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass('menu');

	var title = new UIButton();
	title.setClass('title');
	title.setTextContent(strings.getKey('menubar/iTopoEarthHub'));
	container.add(title);

	var options = new UIPanel();
	options.setClass('options');
	container.add(options);

	var horizenSuperMenu = new UIRow();
	horizenSuperMenu.setClass('option');
	horizenSuperMenu.setTextContent(strings.getKey('menubar/iTopoEarthHub/iTopoSupportLand'));
	horizenSuperMenu.onClick(function() {

	});
	options.add(horizenSuperMenu);

	// var dynamicalVallageMenu = new UIRow();
	// dynamicalVallageMenu.setClass('option');
	// dynamicalVallageMenu.setTextContent(strings.getKey('menubar/iTopoEarthHub/dynamicVallage'));
	// dynamicalVallageMenu.onClick(function() {

	// });
	// options.add(dynamicalVallageMenu);

	return container;
}

export { iTopoMenubarEarthHub };
