/**
 * @author mrdoob / http://mrdoob.com/
 */

import {UIPanel,UIRow,UIButton} from '../js/libs/ui.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoEarthSettings } from './iTopoEarthSettings.js';

function iTopoMenubarBlockChain(editor) {

	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass('menu');

	var title = new UIButton();
	title.setClass('title');
	title.setTextContent(strings.getKey('menubar/blockChain'));
	container.add(title);

	var options = new UIPanel();
	options.setClass('options');
	container.add(options);

	// horizenSuperNodesMap
	var horizenSuperMenu = new UIRow();
	horizenSuperMenu.setClass('option');
	horizenSuperMenu.setTextContent(strings.getKey('menubar/blockChain/horizenSuperNodesMap'));
	horizenSuperMenu.onClick(function() {
		editor.clear();
		iTopoEarthSettings.MAP_KIND = '超级节点儿';
		iTopoEarthModel.ReCreate();
	});
	options.add(horizenSuperMenu);

	// HorizenSecureNodesMap
	var horizenSecureMenu = new UIRow();
	horizenSecureMenu.setClass('option');
	horizenSecureMenu.setTextContent(strings.getKey('menubar/blockChain/HorizenSecureNodesMap'));
	horizenSecureMenu.onClick(function() {
		editor.clear();
		iTopoEarthSettings.MAP_KIND = '普通节点儿';
		iTopoEarthModel.ReCreate();
	});
	options.add(horizenSecureMenu);

	return container;
}

export {
	iTopoMenubarBlockChain
};
