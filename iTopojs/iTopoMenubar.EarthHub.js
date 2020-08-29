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

	var skyCastleMenu = new UIRow();
	skyCastleMenu.setClass('option');
	skyCastleMenu.setTextContent(strings.getKey('menubar/iTopoEarthHub/iTopoSkyCastle'));
	skyCastleMenu.onClick(function() {

	});
	options.add(skyCastleMenu);

	var innerEarthMenu = new UIRow();
	innerEarthMenu.setClass('option');
	innerEarthMenu.setTextContent(strings.getKey('menubar/iTopoEarthHub/iTopoInnerEarth'));
	innerEarthMenu.onClick(function() {

	});
	options.add(innerEarthMenu);

	var lunarMoonMenu = new UIRow();
	lunarMoonMenu.setClass('option');
	lunarMoonMenu.setTextContent(strings.getKey('menubar/iTopoEarthHub/iTopoLunarMoon'));
	lunarMoonMenu.onClick(function() {

	});
	options.add(lunarMoonMenu);

	return container;
}

export { iTopoMenubarEarthHub };
