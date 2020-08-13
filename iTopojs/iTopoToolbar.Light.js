/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIButton } from '../js/libs/ui.js';
import { UIBoolean } from '../js/libs/ui.three.js';
import { iTopoDialogLightStar } from './iTopoDialogLightStar.js';
import { iTopoDialogLightEarth } from './iTopoDialogLightEarth.js';

var iTopoToolbarLight = function ( editor ) {

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setId( 'LightToolbar' );
	container.setDisplay( 'block' );

	var buttons = new UIPanel();
	container.add( buttons );

	var lightStars = new UIButton( strings.getKey( 'iTopoToolbarLight/lightStars' ) );
	//lightStars.dom.className = 'Button selected';
	lightStars.onClick( function () {

		var dlgContainer = new UIPanel();
		dlgContainer.setId( 'iTopoDialog' );
		dlgContainer.setDisplay( 'block' );

		var dlg = new UIPanel();
		dlgContainer.add(dlg);

		var lightStarDlg = new iTopoDialogLightStar( editor );
		dlg.add(lightStarDlg);

		document.body.appendChild(dlgContainer.dom);
	} );
	buttons.add( lightStars );

	var lightEarth = new UIButton( strings.getKey( 'iTopoToolbarLight/lightEarth' ) );
	lightEarth.onClick( function () {

		var dlgContainer = new UIPanel();
		dlgContainer.setId( 'iTopoDialog' );
		dlgContainer.setDisplay( 'block' );

		var dlg = new UIPanel();
		dlgContainer.add(dlg);

		var lightEarthDlg = new iTopoDialogLightEarth( editor );
		dlg.add(lightEarthDlg);

		document.body.appendChild(dlgContainer.dom);

	} );
	buttons.add( lightEarth );

	// signals.objectSelected.add( function ( object ) {

	// 	container.setDisplay( object === null ? 'none' : '' );

	// } );

	return container;

};

export { iTopoToolbarLight };
