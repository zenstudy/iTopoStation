/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIButton } from '../js/libs/ui.js';
import { UIBoolean } from '../js/libs/ui.three.js';
import { LightStarDialog } from './LightStarDialog.js';
import { LightEarthDialog } from './LightEarthDialog.js';

var LightToolbar = function ( editor ) {

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setId( 'LightToolbar' );
	container.setDisplay( 'block' );

	var buttons = new UIPanel();
	container.add( buttons );

	var lightStars = new UIButton( strings.getKey( 'LightToolbar/lightStars' ) );
	//lightStars.dom.className = 'Button selected';
	lightStars.onClick( function () {

		var dlgContainer = new UIPanel();
		dlgContainer.setId( 'iTopoDialog' );
		dlgContainer.setDisplay( 'block' );

		var dlg = new UIPanel();
		dlgContainer.add(dlg);

		var lightStarDlg = new LightStarDialog( editor );
		dlg.add(lightStarDlg);

		document.body.appendChild(dlgContainer.dom);
	} );
	buttons.add( lightStars );

	var lightEarth = new UIButton( strings.getKey( 'LightToolbar/lightEarth' ) );
	lightEarth.onClick( function () {

		var dlgContainer = new UIPanel();
		dlgContainer.setId( 'iTopoDialog' );
		dlgContainer.setDisplay( 'block' );

		var dlg = new UIPanel();
		dlgContainer.add(dlg);

		var lightEarthDlg = new LightEarthDialog( editor );
		dlg.add(lightEarthDlg);

		document.body.appendChild(dlgContainer.dom);

	} );
	buttons.add( lightEarth );

	// signals.objectSelected.add( function ( object ) {

	// 	container.setDisplay( object === null ? 'none' : '' );

	// } );

	return container;

};

export { LightToolbar };
