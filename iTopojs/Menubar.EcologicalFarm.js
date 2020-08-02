/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIRow, UIButton } from '../js/libs/ui.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoEarthSettings } from './iTopoEarthSettings.js';

function MenubarEcologicalFarm( editor ) {

	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass( 'menu' );

	var title = new UIButton(strings.getKey( 'menubar/EcologicalFarm' ));
	title.setClass( 'title' );
//	title.setTextContent( strings.getKey( 'menubar/EcologicalFarm' ) );
	container.add( title );

	var options = new UIPanel();
	options.setClass('options');
	container.add(options);

	// itopoBase
	var itopoBaseMenu = new UIRow();
	itopoBaseMenu.setClass('option');
	itopoBaseMenu.setTextContent(strings.getKey('menubar/EcologicalFarm/itopoBase'));
	itopoBaseMenu.onClick(function() {
		editor.clear();
		iTopoEarthSettings.MAP_KIND = '共创基地';
		iTopoEarthModel.ReCreate();
		iTopoEarthModel.RotateToBeijing(editor.camera);
	});
	options.add(itopoBaseMenu);

	return container;

}

export { MenubarEcologicalFarm };
