/**
 * @author mrdoob / http://mrdoob.com/
 */

import {UIPanel,UIRow,UIButton} from '../js/libs/ui.js';
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
		// editor.clear();
		// iTopoEarthSettings.MAP_KIND = '超级节点儿';
		// iTopoEarthModel.ReCreate();
	});
	options.add(horizenSuperMenu);

	return container;
}

export { iTopoMenubarEarthHub };
